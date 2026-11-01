---
name: ayling-fullstack-development
description: "Plan and implement focused frontend/backend changes, APIs, handlers, validation, database integration, and maintainable code with tests and documentation."
---

# Ayling Full-Stack Development

Use this skill when modifying an existing repository, implementing a feature, building API handlers, integrating a database or external service, fixing implementation gaps, or scaffolding a project.

## Procedure
1. Confirm the task and acceptance criteria. Inspect the actual repository, README, package scripts, versions, code conventions, current changes, related modules, and tests before editing.
2. Propose a compact plan and list likely files. Do not overwrite user work or perform a broad rewrite by default.
3. Follow the existing architecture unless a change is justified. Keep routing/transport, validation, business logic, data access, and presentation responsibilities clear.
4. Validate input at trust boundaries; enforce authorization in the server-side path; normalize error responses; avoid leaking secrets or stack traces.
5. Implement the smallest coherent, reviewable change. Avoid unnecessary dependencies and unrelated formatting churn.
6. Add or update unit/integration/E2E tests relevant to the behavior and failure paths. Update docs, configuration examples, API schemas, and migrations where needed.
7. Run available checks only if tools permit. Record the exact command and outcome. Mark unavailable checks as `NOT RUN` rather than implying success.
8. Inspect the final diff for accidental changes, secrets, test coverage, backwards compatibility, and documentation drift.
9. Stop and ask for approval before production deployment, destructive operations, paid services, or high-impact data/permission changes.

## Output
Task summary; plan; files/modules changed; key implementation choices; checks run and their outcomes; tests not run; risks/limitations; next action and approvals.

## Quality bar
Code being generated is not the same as code being executed. Code being executed is not the same as a passing test. Passing tests do not by themselves authorize a production release.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
