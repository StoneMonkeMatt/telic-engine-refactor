# Experiment completion and preservation gate

An experiment is not complete when its run finishes. It is complete only when its scientific record is recoverable without relying on a working directory, an expiring CI artifact, or conversational memory.

Every future experiment must satisfy all of the following before the next experiment opens:

1. Preregistration, fixed coefficients, sham construction and claim boundary are committed before the outcome run.
2. Executed source, assembly source, configuration and source-hash receipts are committed.
3. The permanent result document and canonical mathematics ledger are updated without changing the preregistered law retrospectively.
4. Raw summaries, traces, manifests and logs are packaged into an integrity-tested archive.
5. The archive and every uncommitted raw file receive SHA-256 receipts.
6. Evidence bytes are placed in persistent storage. A GitHub Actions artifact with an expiry date is not the sole copy.
7. The preservation manifest names the experiment, result commit, workflow run, archive name, byte size, SHA-256 and storage class.
8. The branch is committed and pushed, the remote head is verified, and the preservation check passes.
9. Only after steps 1–8 may the experiment be described as completed or the next carrier be opened.

The automated verifier checks repository inventory, the sealed mathematics receipt, artifact receipts and—when the raw directory is present—the complete raw-evidence hash set.

Historical scientific records remain immutable. Later preservation metadata is additive and must not silently rewrite an earlier outcome.
