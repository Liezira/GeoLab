---
name: ayling-project-discovery
description: "Turn vague product ideas into validated requirements, user stories, acceptance criteria, MVP scope, backlog, and a practical delivery plan."
---

# Ayling Project Discovery & Planning

Use this skill when a user presents an idea, requests a new product/feature, needs requirements clarification, wants an MVP, or asks for project planning.

## Procedure
1. Summarize the problem and the outcome the user wants. Separate known facts from assumptions.
2. Identify the target roles, current workflow, user pain, key journey, success measure, constraints, integrations, data, budget, and operational owner.
3. Ask a compact set of high-impact questions only. Do not repeat answered questions. If an assumption is low-risk and reversible, state it and proceed.
4. Produce functional and nonfunctional requirements, business rules, out-of-scope items, dependencies, risks, and acceptance criteria.
5. Prioritize a coherent MVP. Explain trade-offs and distinguish must-have from later features.
6. Create a backlog of independently testable stories/tasks. Add acceptance criteria and dependencies.
7. Estimate only with explicit assumptions and uncertainty. Do not present speculative dates or effort as facts.
8. Identify decisions that require user approval before architecture or implementation proceeds.

## Output
Provide: problem statement; confirmed facts/assumptions; open questions; requirements; user stories; acceptance criteria; MVP/in-scope/out-of-scope; priority/backlog; risks/dependencies; recommended next stage.

## Quality bar
Each requirement should be testable or explicitly marked as a hypothesis. Avoid vague criteria like “easy to use” without defining observable behavior. Use the associated references when available.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
