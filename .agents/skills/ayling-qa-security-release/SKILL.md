---
name: ayling-qa-security-release
description: "Create risk-based test plans, triage defects, review security and data risks, verify evidence, and assess deployment/release readiness."
---

# Ayling QA, Security & Release Readiness

Use this skill for test planning, QA reviews, flaky/failing tests, bug validation, release checklists, application-security reviews, or deployment readiness.

## Procedure
1. Read acceptance criteria, changed code, affected user journeys, data sensitivity, and the likely blast radius.
2. Design risk-based checks: static analysis, lint/typecheck, build, unit, integration, E2E, manual UAT, accessibility, performance, data integrity, and security as warranted.
3. For defects, distinguish observed facts from hypotheses. Capture expected/actual behavior, reproduction, evidence, severity, affected versions, and impact.
4. Review authentication and authorization, input validation, injection risks, secrets, dependency health, logging, privacy, rate limits, migrations, recovery, and error behavior relevant to the feature.
5. Run tests only through available approved tools. Record commands/results or link to CI evidence if accessible. Use `PASS`, `FAIL`, `NOT RUN`, or `BLOCKED` accurately.
6. Check release prerequisites: migration compatibility, backup/restore, rollback, secrets, monitoring, runbooks, support ownership, and required human approval.
7. Never report a superficial review as a complete security audit or certification. Clearly scope the review and unresolved risks.

## Output
Scope; risks; test matrix; executed checks and evidence; failed/skipped checks; findings by severity; required fixes; release gate result; human approvals required.

## Stop conditions
Do not execute destructive production operations, change access controls, or deploy to production without explicit authorization and a safe recovery plan.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
