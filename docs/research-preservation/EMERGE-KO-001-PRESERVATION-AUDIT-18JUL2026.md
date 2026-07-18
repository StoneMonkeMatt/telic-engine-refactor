# EMERGE-KO-001 research preservation audit

Date: 18 July 2026

Repository: StoneMonkeMatt/telic-engine-refactor

Branch: agent/emerge-ko-001-sandbox

Pre-checkpoint remote commit: 574feb0f0e739d57c9301d70230b2020e54b58fc

## Ruling

The located EMERGE-KO-001 research is not held only in conversational memory.

V1, V2, V2.1, V2.2 and Carriers 001, 002, 002C, 003, 003B, 003C, 003D, 003E and 003F have repository records. V2.2 through Carrier-003F also have persistent evidence archives with committed SHA-256 receipts.

## Recovered hash-recorded mathematics

The missing reference document was recovered as the original stored file, not reconstructed:

~~~text
docs/mathematics-lineage/BLUE-WHALE-MATHEMATICS-COMPLETE-V3-17JUL2026-RECOVERED-SOURCE.md
~~~

Its original seal verifies exactly:

~~~text
b5e916465758a04a3e5ee63172b3b8b1530abfcf092ca9c088700c5e3f0c5dff
~~~

The same seal also covers:

~~~text
34e68433d3a55b970d27687709d3d3ba9abcf2b1ea66952253df3da1c5f06a5e  V3-O2-COMPOUND-EMERGENCE-AUDIT-EXTRACT.md
~~~

The V1 reference source and the 14 July and 16 July V3 lineage updates were recovered alongside the hash-recorded pair.

## Experiment inventory

| Phase | Repository record | Persistent evidence |
| --- | --- | --- |
| V1 | runner, configuration, README and mathematics ledger | No separate original raw artifact located |
| V2 | tracked runner and mathematics ledger | No separate original raw artifact located |
| V2.1 | tracked runner and trajectory audit | No separate original raw artifact located |
| V2.2 | result document, selector, runner and workflow | Verified Library ZIP |
| Carrier-001 | result document and null runner | Verified Library ZIP |
| Carrier-002 | result document, freezer and runner | Verified Library ZIP |
| Carrier-002C | result document, runner and workflow | Verified Library ZIP |
| Carrier-003 | preregistration, result, hash-recorded source patches and workflow | Verified Library ZIP |
| Carrier-003B | preregistration, result, hash-recorded runner/aggregate parts and workflow | Verified Library ZIP |
| Carrier-003C | preregistration, result, pure projector, assembler, verifier and workflow | Verified Library ZIP |
| Carrier-003D | preregistration, result, runner/aggregate assemblers and workflow | Verified Library ZIP |
| Carrier-003E | preregistration, result, acceleration verifier, assemblers and workflow | Verified Library ZIP recovered from recorded run |
| Carrier-003F | preregistration, dark audit, final result, projector, audit tools, assemblers and workflow | Verified deterministic Library archive of the complete local evidence set |

The machine-readable path inventory is:

~~~text
docs/research-preservation/EMERGE-KO-001-PRESERVATION-MANIFEST-18JUL2026.json
~~~

## Evidence preservation

Ten evidence archives covering V2.2 through Carrier-003F have persistent copies. Their combined size is 442,636,721 bytes. Every archive hash is recorded in:

~~~text
docs/research-preservation/EMERGE-KO-001-ARTIFACT-SHA256SUMS-18JUL2026.txt
~~~

The current ignored raw directory contains:

~~~text
77 files
492,444,914 bytes
~~~

Every file has an individual SHA-256 receipt in:

~~~text
docs/research-preservation/EMERGE-KO-001-RAW-EVIDENCE-SHA256-18JUL2026.txt
~~~

The directory was also hash-recorded into a deterministic archive:

~~~text
EMERGE-KO-001-RAW-EVIDENCE-18JUL2026.tar.gz
94,533,023 bytes
9e4aa92b72d514a71d3fa97f684ad8315dc4f20894df1e557bb6600038e3a593
~~~

The archive is stored persistently in Library. Its checksum and complete contents register are stored in Git.

## Recorded archive receipts

| Phase | Workflow run | Bytes | SHA-256 |
| --- | ---: | ---: | --- |
| V2.2 | 29563428289 | 67,757 | 3431b6c0ec66846819ac73e410a8d2ad5878c3f3bf0ae43cc8a9e0fb0975d043 |
| Carrier-001 | 29565733958 | 70,621 | cb9792a72f09ad0c8881b041fc66dfba05a9ae393c6a294ad7c684df87231865 |
| Carrier-002 | 29568090469 | 2,320,207 | f1dcbfd628ffc0e3a2f24c0324e0c37655c3dd66e9bd2ac03cf98a4b78e32ab3 |
| Carrier-002C | 29572723082 | 3,602,096 | 4cf869f339b49822c61a4c2378f552dcbe8a7e5e2e54ff0052a0225098e44e49 |
| Carrier-003 | 29575934765 | 8,017,367 | cc701497c87f5b0ec18b36593a1cbcd0c4bdad537c738c4ac736a8ffa835ba6e |
| Carrier-003B | 29579962999 | 91,136,647 | a86c473f5a17dbc53fa693662f9665f485c7b969159f6cf0ffb435210136ba88 |
| Carrier-003C | 29610229475 | 4,104,823 | fd051cfcc4ca427ec6a043744eb1eb031cf50ea101f23a9f5a4a8abe5c8395b9 |
| Carrier-003D | 29614750232 | 94,315,403 | f96822d106a73d510ad6a0e89343cee1492b982fe31ed2af9d8be689fa15155c |
| Carrier-003E | 29621108507 | 144,468,777 | ce15b5a7d93e296d9c5a4975778ceeef94dd06baecf34966a6f1105838b70711 |
| Carrier-003F checkpoint | 29641237892 | 94,533,023 | 9e4aa92b72d514a71d3fa97f684ad8315dc4f20894df1e557bb6600038e3a593 |

Every ZIP listed above was integrity-tested. The Carrier-003F checkpoint is a deterministic TAR.GZ and its 77 content hashes were independently registered.

## Honest residual boundary

No separate original raw-output archives were located for V1, V2 or V2.1. Their executable source, configuration, trajectory audit and ledger claims are committed, so those phases are not memory-only, but their original output bytes cannot be claimed as independently archived.

The Carrier-003F official GitHub Actions rerun was still active when this checkpoint was assembled. Its completed local evidence is already independently preserved; the official artifact receipt should be added when the run completes.

## Workflow correction

Future experiments are governed by:

~~~text
docs/research-preservation/EXPERIMENT-COMPLETION-CHECK.md
~~~

The preservation verifier and GitHub workflow make remote commit and evidence registration part of experiment completion rather than an afterthought.
