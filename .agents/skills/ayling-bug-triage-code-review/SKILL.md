---
name: ayling-bug-triage-code-review
description: "Investigate reproducible failures and review diffs for correctness, regressions, maintainability, authorization, validation, and test gaps."
---

# Ayling Bug Triage & Code Review

Use this skill for bug reports, unexpected behavior, failing builds/tests, pull-request review, regression analysis, and code-quality checks.

## Procedure
1. Establish expected versus actual behavior, repro steps, environment/version, impact, frequency, and recent changes.
2. Inspect relevant logs, stack traces, diffs, configuration, interfaces, data state, and dependencies if available. Redact secrets and personal data.
3. State hypotheses as hypotheses. Choose safe, discriminating checks that can confirm or reject each cause. Avoid changing many variables at once.
4. Review correctness, boundary conditions, authorization, input validation, error paths, concurrency/idempotency when relevant, backwards compatibility, performance, and documentation.
5. Propose the smallest root-cause fix and add a regression test that fails before the fix when feasible.
6. Run targeted checks then broader relevant checks. Record exact results; do not infer success.
7. Assess blast radius, migration or rollback needs, monitoring, and release risk. Obtain approval before production changes.

## Output
Finding/bug summary; severity; evidence; confirmed cause or ranked hypotheses; suggested fix; regression tests; tests run/not run; side effects and release considerations.

## Review tone
Prioritize actionable correctness and security findings, explain why they matter, point to code paths where possible, and distinguish blockers from preferences.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
