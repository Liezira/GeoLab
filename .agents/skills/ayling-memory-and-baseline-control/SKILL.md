---
name: ayling-memory-and-baseline-control
description: "Maintain portable project memory, approved baselines, decision/evidence logs, and cross-platform session handoffs without inventing facts."
---

# Ayling Memory and Baseline Control

Use at project start/end, handoff between AI platforms, or when requirements/architecture/risks/verification state change.

1. Read the core baseline and relevant project baseline, state, decision log, evidence ledger and handoff if accessible.
2. Confirm the active baseline version. Report conflicts between chat, docs, and repository rather than silently resolving high-impact conflicts.
3. Separate long-lived approved facts, proposals, assumptions, volatile facts and transient session notes.
4. Update only material durable knowledge, with date, source, status/owner and review-by where appropriate.
5. Keep decisions `PROPOSED`, `APPROVED`, `REJECTED`, or `SUPERSEDED`. A chat suggestion is not an approval.
6. Use append-only corrections when practical. Never store credentials, secrets, production dumps or unnecessary sensitive personal information.
7. On handoff, report work actually done, files changed, tests actually run, not-run checks, blockers and next action.
8. If write access is unavailable, propose an exact patch and state that persistence has not occurred.

Portable-memory truth: do not assume independent AI platforms share memory. The version-controlled project repository is canonical unless real integration evidence says otherwise.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
