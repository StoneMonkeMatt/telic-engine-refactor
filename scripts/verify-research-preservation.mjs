import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const manifestPath =
  'docs/research-preservation/EMERGE-KO-001-PRESERVATION-MANIFEST-18JUL2026.json';
const manifest = JSON.parse(readFileSync(resolve(root, manifestPath), 'utf8'));

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function hashFile(path) {
  return createHash('sha256')
    .update(readFileSync(resolve(root, path)))
    .digest('hex');
}

function parseChecksums(path) {
  const entries = readFileSync(resolve(root, path), 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([0-9a-f]{64}) {2}(.+)$/);
      assert(match, 'Invalid SHA-256 receipt line in ' + path + ': ' + line);
      return { sha256: match[1], path: match[2] };
    });
  assert(
    new Set(entries.map((entry) => entry.path)).size === entries.length,
    'Duplicate paths in ' + path,
  );
  return entries;
}

assert(manifest.schemaVersion === 1, 'Unsupported preservation manifest schema.');
assert(
  manifest.repository === 'StoneMonkeMatt/telic-engine-refactor',
  'Repository identity drifted.',
);

const phaseRecords = manifest.phases.flatMap((phase) => phase.records);
for (const path of phaseRecords) {
  assert(existsSync(resolve(root, path)), 'Missing preservation record: ' + path);
}

const expectedDocs = [...new Set(
  phaseRecords.filter((path) => path.startsWith('docs/EMERGE-') && path.endsWith('.md')),
)].sort();
const actualDocs = readdirSync(resolve(root, 'docs'))
  .filter((name) => name.startsWith('EMERGE-') && name.endsWith('.md'))
  .map((name) => 'docs/' + name)
  .sort();
assert(
  JSON.stringify(expectedDocs) === JSON.stringify(actualDocs),
  'The preservation manifest does not cover every top-level EMERGE document.',
);

const expectedWorkflows = [...new Set(
  phaseRecords.filter((path) => path.startsWith('.github/workflows/emerge-')),
)].sort();
const actualWorkflows = readdirSync(resolve(root, '.github/workflows'))
  .filter((name) => name.startsWith('emerge-') && name.endsWith('.yml'))
  .map((name) => '.github/workflows/' + name)
  .sort();
assert(
  JSON.stringify(expectedWorkflows) === JSON.stringify(actualWorkflows),
  'The preservation manifest does not cover every EMERGE workflow.',
);

const mathematicsEntries = parseChecksums(manifest.recordedMathematics.receipt);
for (const entry of mathematicsEntries) {
  const path = manifest.recordedMathematics.directory + '/' + entry.path;
  assert(existsSync(resolve(root, path)), 'Missing mathematics source file: ' + path);
  assert(hashFile(path) === entry.sha256, 'Mathematics source hash mismatch: ' + path);
}

const artifactEntries = parseChecksums(manifest.artifactChecksumRegister);
const artifactMap = new Map(artifactEntries.map((entry) => [entry.path, entry.sha256]));
assert(
  artifactEntries.length === manifest.artifacts.length,
  'Artifact checksum register count does not match the preservation manifest.',
);
for (const artifact of manifest.artifacts) {
  assert(
    artifactMap.get(artifact.file) === artifact.sha256,
    'Artifact receipt mismatch: ' + artifact.file,
  );
}

const rawEntries = parseChecksums(manifest.rawEvidence.checksumRegister);
assert(
  rawEntries.length === manifest.rawEvidence.fileCount,
  'Raw evidence checksum count does not match the preservation manifest.',
);
assert(
  rawEntries.every(
    (entry) => entry.path.startsWith(manifest.rawEvidence.directory + '/'),
  ),
  'Raw evidence receipt contains an out-of-scope path.',
);

const presentRawEntries = rawEntries.filter((entry) =>
  existsSync(resolve(root, entry.path)),
);
if (presentRawEntries.length > 0) {
  assert(
    presentRawEntries.length === rawEntries.length,
    'Only part of the registered raw evidence set is present.',
  );
  let totalBytes = 0;
  for (const entry of rawEntries) {
    assert(hashFile(entry.path) === entry.sha256, 'Raw evidence hash mismatch: ' + entry.path);
    totalBytes += statSync(resolve(root, entry.path)).size;
  }
  assert(
    totalBytes === manifest.rawEvidence.totalBytes,
    'Raw evidence byte total drifted: expected ' +
      manifest.rawEvidence.totalBytes +
      ', got ' +
      totalBytes,
  );
}

console.log(JSON.stringify({
  preservedPhases: manifest.phases.length,
  repositoryRecords: new Set(phaseRecords).size,
  mathematicsSourceFiles: mathematicsEntries.length,
  persistentArtifacts: artifactEntries.length,
  rawEvidenceReceipts: rawEntries.length,
  rawEvidenceVerifiedLocally: presentRawEntries.length === rawEntries.length,
}, null, 2));
