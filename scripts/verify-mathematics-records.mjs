import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const completeSourcePath = 'docs/mathematics-lineage/BLUE-WHALE-MATHEMATICS-COMPLETE-V3-17JUL2026-RECOVERED-SOURCE.md';
const receiptPath = 'docs/mathematics-lineage/V3-SOURCE-SHA256SUMS.txt';

const expected = Object.freeze({
  bytes: 276296,
  lines: 9401,
  sha256: 'b5e916465758a04a3e5ee63172b3b8b1530abfcf092ca9c088700c5e3f0c5dff',
});

const [completeSource, receipt] = await Promise.all([
  readFile(completeSourcePath),
  readFile(receiptPath, 'utf8'),
]);

const failures = [];
const inspect = (contents) => ({
  bytes: contents.byteLength,
  lines: contents.toString('utf8').split('\n').length - 1,
  sha256: createHash('sha256').update(contents).digest('hex'),
});
const observedComplete = inspect(completeSource);

for (const field of ['bytes', 'lines', 'sha256']) {
  if (observedComplete[field] !== expected[field]) {
    failures.push(`complete source ${field}: expected ${expected[field]}, observed ${observedComplete[field]}`);
  }
}

const completeReceipt = `${expected.sha256}  ${completeSourcePath.split('/').at(-1)}`;
if (!receipt.split('\n').includes(completeReceipt)) {
  failures.push(`complete-source receipt missing exact entry: ${completeReceipt}`);
}

if (failures.length > 0) {
  console.error('Mathematics records verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    path: completeSourcePath,
    bytes: observedComplete.bytes,
    lines: observedComplete.lines,
    sha256: observedComplete.sha256,
  }, null, 2));
}
