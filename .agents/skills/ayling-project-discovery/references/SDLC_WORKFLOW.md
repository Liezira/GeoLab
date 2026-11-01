# SDLC Workflow and Quality Gates

## Delivery stages

1. Discovery — problem, users, current process, desired outcomes, success measures, constraints, integrations, cost, and operational needs.
2. Requirements — functional and nonfunctional needs, business rules, assumptions, out-of-scope items, user stories, priorities, dependencies, and acceptance criteria.
3. Planning — MVP, backlog, milestones, ownership, estimates with uncertainty, risks, and dependencies.
4. Architecture/design — module boundaries, system/data/API contracts, handler flow, security, UX, deployment model, migrations, rollback, and observability.
5. Development — small reviewable slices, code consistency, automated tests, documentation, and traceable changes.
6. Verification — risk-based static checks, tests, manual review, security/privacy, data integrity, accessibility, responsiveness, and user acceptance.
7. Release — change review, environment/configuration, secrets, migration and backup, rollback, monitoring, runbook, approval, and deployment evidence.
8. Maintenance — feedback, incidents, defects, technical debt, operational metrics, and prioritized improvements.

## Quality gates

- **Discovery gate:** problem and target user are clear enough to plan.
- **Scope gate:** MVP, in/out of scope, and acceptance criteria are agreed.
- **Design gate:** high-impact architecture, data, auth, and integration decisions are reviewed.
- **Implementation gate:** code change maps to a requirement/issue and includes relevant tests/docs.
- **Verification gate:** required checks actually run and pass; skipped checks are visible.
- **Release gate:** rollback/recovery, operational readiness, and required human approval exist.

## Nonlinear iteration

Testing can send a change back to implementation or design. A new requirement triggers an impact analysis covering user experience, API contracts, schema, permissions, tests, migration, cost, and schedule. Avoid restarting the entire SDLC when a bounded change can be safely isolated.

## Definition of Done

1. Acceptance criteria met.
2. Code and documentation consistent.
3. Required tests/checks run with evidence.
4. Relevant security, authorization, data integrity, and error paths addressed.
5. Critical risk resolved or explicitly accepted by an authorized human.
6. Known limitations and unrun checks documented.
7. Required reviews/approvals completed.
