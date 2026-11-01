# QA, Security, and Release Readiness

## Risk-based test strategy

Choose tests based on feature impact, data sensitivity, complexity, and failure cost.

- Static checks: lint, format, type checking, dependency/static security scans where available.
- Unit tests: business rules, validation, pure functions, boundaries, and error mapping.
- Integration tests: database, API, identity, external adapters, transactions, and module contracts.
- End-to-end tests: high-value user journeys and critical permission boundaries.
- Manual/UAT: domain-specific behavior, usability, accessibility, and acceptance criteria not fully represented by automation.
- Nonfunctional checks: performance, reliability, recovery, compatibility, observability, and privacy when relevant.

## Evidence language

- `PASS`: a check actually ran and passed; cite the command/test report or observable result.
- `FAIL`: a check ran and failed; summarize the failure and location.
- `NOT RUN`: unavailable, skipped, or not yet executed; explain why.
- `BLOCKED`: cannot proceed due to missing access, dependency, or decision.

Never infer build success from code reading. Never call a test “passed” because a test file was written.

## Security baseline

Consider threat actors, assets, trust boundaries, authentication, authorization, input handling, injection, CSRF/CORS where relevant, secrets, session/token handling, dependency risks, logging, rate limits, data minimization, retention, export, and audit needs.

For high-risk apps, choose an appropriate current security standard and define testable controls. Do not claim security certification or a complete audit from a superficial review.

## Release checklist

- Acceptance criteria and required tests passed.
- Review of critical/high findings and explicit risk disposition.
- Environment and config validated; secrets stored appropriately.
- Database migration, compatibility, backup, and rollback/recovery tested or planned according to risk.
- Monitoring, alerts, health checks, and logs ready for important flows.
- Runbook, ownership, support/incident escalation, and known limitations documented.
- Human approval obtained for production release and other high-impact actions.
- Release version, change summary, verification evidence, and rollback steps recorded.

## Incident/bug report

- Summary and severity:
- Affected versions/users/data:
- Expected vs actual:
- Reproduction steps:
- Evidence/logs with secrets removed:
- Suspected causes (explicitly unverified until proven):
- Impact and mitigations:
- Fix and regression test:
- Release/rollback status:
