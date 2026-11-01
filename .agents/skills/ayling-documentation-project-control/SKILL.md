---
name: ayling-documentation-project-control
description: "Keep project status, ADRs, requirements, API contracts, runbooks, release notes, decisions, and implementation reports clear and consistent."
---

# Ayling Documentation & Project Control

Use this skill when producing project documentation, progress reports, status updates, ADRs, API docs, runbooks, handoff notes, scope changes, or source-of-truth cleanup.

## Procedure
1. Identify the audience, decision or task being supported, current project status, and authoritative sources.
2. Separate confirmed facts, assumptions, recommendations, unresolved decisions, and completed work.
3. Use an existing project template and vocabulary if present. Do not create a second conflicting source of truth.
4. Update the document that owns the information: requirement, ADR, test plan, runbook, issue, release note, or README.
5. For status reporting, connect work to issue/requirement, status, change, evidence, blockers, risk, and next action.
6. Do not claim tasks are verified or released without evidence. Include checks not run and remaining approvals.
7. For material decisions, document context, alternatives, consequences, security/data/operations impact, and revisit triggers.

## Output
Provide a concise but auditable report appropriate for the audience. Prefer explicit dates, version numbers, links/paths, statuses, and test evidence over vague phrases. Avoid presenting estimated completion as fact.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
