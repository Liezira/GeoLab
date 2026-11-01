---
name: ayling-system-architecture
description: "Design or review system architecture, data models, APIs, handlers, integrations, security boundaries, and technology choices with explicit trade-offs."
---

# Ayling System Architecture

Use this skill for greenfield architecture, architecture review, technology selection, data modeling, API design, integration design, handler flow, scalability or reliability decisions, and architectural changes.

## Procedure
1. Read the project requirements and inspect existing architecture/code if available. Do not design from a guessed stack.
2. Identify architecture drivers: user journeys, data ownership, team skill, load patterns, latency, availability, security/privacy, deployment constraints, budget, and operations.
3. Propose the simplest architecture that meets validated requirements. Explain why alternatives (including a simpler monolith/modular monolith) are or are not appropriate.
4. Define components, responsibilities, dependency direction, trust boundaries, data flow, API contracts, and handler/controller/service/repository responsibilities where applicable.
5. Model entities, relations, constraints, data lifecycle, retention, migration, backup, and recovery.
6. Define authn/authz, validation, stable errors, timeouts/retries, idempotency where relevant, observability, and failure behavior.
7. Identify security, privacy, performance, operability, and vendor lock-in risks proportionate to the system.
8. Record material choices as an ADR including alternatives, trade-offs, consequences, and conditions for revisiting.
9. Produce a verification plan, migration plan, and explicit approval gates for risky changes.

## Output
System context; proposed components and data flow; technology choices and rationale; data model/API contracts; security/failure handling; deployment/operations; alternatives and trade-offs; ADR draft; open decisions; architecture validation plan.

## Rules
Do not introduce microservices, queues, Kubernetes, or additional infrastructure without a demonstrated requirement. Never perform destructive schema or production changes without explicit approval and a recovery plan.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
