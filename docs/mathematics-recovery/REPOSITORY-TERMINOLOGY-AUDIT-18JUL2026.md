# Repository Terminology Audit — 18 July 2026

## Purpose

This audit identifies labels that can imply status, control, completeness, or scientific support beyond what the recorded evidence establishes. Active code, experiment records, workflows, and navigation now use terms that describe their observable function.

## Changes completed

- Manual data fields and types now use `sourceType`, `reference`, and descriptive record names.
- Experiment prose now uses `formula`, `check`, `supported`, `result`, `recorded`, and `summary` where those words match the operation.
- Mathematics recovery records now live in `docs/mathematics-recovery/`.
- The complete V3 file is named `RECOVERED-SOURCE`; the truncated uploaded file is named `PARTIAL-UPLOADED-COPY`.
- Mathematics verification scripts and workflows are named for record verification rather than document status.
- Preservation metadata uses `source`, `recordedMathematics`, and hash-specific field names.

## Deliberately retained instances

The following instances remain because changing them would damage evidence or alter a real subject name:

- byte-preserved historical mathematics sources in `docs/mathematics-lineage/`;
- the exact original uploaded filename recorded in provenance;
- exact artifact filenames and experiment identifiers needed to locate prior evidence;
- `Law` as the name of an ontology domain and ordinary references to legal or scientific laws;
- license text.

Retaining these instances does not assign them any additional status. It preserves exact source identity or the intended domain meaning.

## Verification

- Complete recovered V3 SHA-256: `b5e916465758a04a3e5ee63172b3b8b1530abfcf092ca9c088700c5e3f0c5dff`
- Partial uploaded copy SHA-256: `ea0cd5dd0ceb749fef8def7b21754e881dd2208e117594b78b40fd1dd70172d6`
- Mathematics-record verification: passed.
- Research-preservation verification: passed.

Future names should state what a file, value, check, or result does without implying wider support than its evidence provides.
