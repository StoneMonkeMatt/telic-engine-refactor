# Experiment completion and preservation check

An experiment has a recoverable scientific record when the following evidence is present:

1. Preregistration, fixed coefficients, sham construction and claim boundary are committed before the outcome run.
2. Executed source, assembly source, configuration and source-hash receipts are committed.
3. The permanent result document and reference mathematics ledger are updated without changing the preregistered formula retrospectively.
4. Raw summaries, traces, manifests and logs are packaged into an integrity-tested archive.
5. The archive and every uncommitted raw file receive SHA-256 receipts.
6. Evidence bytes are placed in persistent storage. A GitHub Actions artifact with an expiry date is not the sole copy.
7. The preservation manifest names the experiment, result commit, workflow run, archive name, byte size, SHA-256 and storage class.
8. The branch is committed and pushed, the remote head is verified, and the preservation check passes.
9. The completion statement records whether steps 1–8 are present and identifies any missing evidence directly.

The automated verifier checks repository inventory, the hash-recorded mathematics receipt, artifact receipts and—when the raw directory is present—the complete raw-evidence hash set.

Historical results retain their original numbers and text. Later preservation metadata is recorded separately with its date and purpose.
