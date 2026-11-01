---
name: ayling-ai-slop-audit
description: "Audit code, plans, generated UI, and reports for hallucinated details, generic filler, fake functionality, overengineering, and unsupported completion claims."
---

# Ayling AI-Slop Audit

Use before handoff for significant code/design/docs or when reviewing a generated artifact.

Inspect actual files and the requested acceptance criteria. Audit for:
- invented paths, APIs, versions, metrics, citations, test results or integrations;
- filler/generic advice and duplicated boilerplate that does not serve the task;
- excessive dependencies, architecture, abstractions or scope with no demonstrated need;
- dead controls, fake success, static mock results mislabeled as real, fake dashboards;
- TODOs, ellipses, missing imports, undefined symbols, stubbed handlers and swallowed errors presented as complete;
- missing validation, authorization, failure states, accessibility or data integrity where relevant;
- misleading statements like "tested", "verified", "secure", "production-ready" without the corresponding evidence.

For each finding, provide severity, exact file/path/line when observable, evidence, user impact, a minimal correction, and a regression check. Do not claim a path/line exists unless inspected.

Hard-fail if evidence is fabricated, a secret leaked, a destructive action is unapproved, or a known critical problem is hidden. Otherwise distinguish blocker, major, minor and deliberate accepted trade-off. Finish with `PASS`, `PASS WITH DISCLOSED GAPS`, or `FAIL`; explain the criteria and evidence.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
