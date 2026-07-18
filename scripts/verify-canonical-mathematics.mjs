import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const canonicalPath = 'docs/canonical/BLUE-WHALE-MATHEMATICS-COMPLETE-V3-17JUL2026-SEALED-CANONICAL.md';
const recoveryPath = 'docs/canonical/BLUE-WHALE-MATHEMATICS-COMPLETE-V3-RECOVERY.md';
const indexPath = 'docs/canonical/README.md';

const expected = Object.freeze({
  bytes: 200705,
  sha256: 'ea0cd5dd0ceb749fef8def7b21754e881dd2208e117594b78b40fd1dd70172d6',
  sourceSha256: 'f580e84a7b7ff12c8806f03a096fce9f64be8cb35752de7a0c6736329233c505',
  ending: 'It first appears with `c\n',
});

const [canonical, recovery, index] = await Promise.all([
  readFile(canonicalPath),
  readFile(recoveryPath, 'utf8'),
  readFile(indexPath, 'utf8'),
]);

const failures = [];
const observedSha256 = createHash('sha256').update(canonical).digest('hex');
const canonicalText = canonical.toString('utf8');

if (canonical.byteLength !== expected.bytes) {
  failures.push(`canonical byte length: expected ${expected.bytes}, observed ${canonical.byteLength}`);
}

if (observedSha256 !== expected.sha256) {
  failures.push(`canonical SHA-256: expected ${expected.sha256}, observed ${observedSha256}`);
}

if (!canonicalText.endsWith(expected.ending)) {
  failures.push('canonical ending changed; verify a recovered continuation before updating the sealed receipt');
}

for (const required of [expected.sha256, expected.sourceSha256, 'ends during section `31.6.12A.3']) {
  if (!recovery.includes(required)) {
    failures.push(`recovery record no longer contains required evidence: ${required}`);
  }
}

for (const required of [
  'BLUE-WHALE-MATHEMATICS-COMPLETE-V3-17JUL2026-SEALED-CANONICAL.md',
  'BLUE-WHALE-MATHEMATICS-COMPLETE-V3-RECOVERY.md',
  'BLUE-WHALE-MATHEMATICS-COMPLETE-V3-PROVENANCE-INDEX.md',
  'BLUE-WHALE-MATHEMATICS-V3-SECTION-SOURCE-MATRIX.md',
]) {
  if (!index.includes(required)) {
    failures.push(`canonical index no longer links ${required}`);
  }
}

if (failures.length > 0) {
  console.error('Canonical mathematics integrity verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Canonical mathematics verified: ${observedSha256}`);
}
