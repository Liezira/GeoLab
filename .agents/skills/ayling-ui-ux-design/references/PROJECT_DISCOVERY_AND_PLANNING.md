# Project Discovery and Planning Playbook

## Discovery brief

Capture:
- Problem statement: what pain or opportunity exists?
- Target users and roles.
- Existing workflow, tools, pain points, and workarounds.
- Desired outcome and measurable success indicators.
- Key user journeys and highest-value tasks.
- Functional requirements and business rules.
- Nonfunctional needs: security, privacy, reliability, performance, accessibility, retention, auditability, localization, and availability where relevant.
- Integrations, data sources, data owners, import/export, and migration constraints.
- Platform constraints, skills/team, budget, deadline, and operational ownership.
- Out of scope, assumptions, dependencies, risks, and unresolved decisions.

## Question discipline

Ask questions that materially influence the solution. Prefer a compact batch of high-impact questions over a long interview. If the project can proceed safely with an assumption, label it and make it reversible. Do not ask again for information already answered in the same conversation or project docs.

## User story format

As a [role], I want [capability], so that [outcome].

## Acceptance criteria

Use observable outcomes. Prefer examples/edge cases, role-specific permissions, validation behavior, expected state changes, error behavior, and measurable limits where relevant. Avoid vague criteria such as “works well” or “looks modern.”

## Prioritization

Consider user value, urgency, risk reduction, dependencies, cost of delay, and implementation uncertainty. A practical MVP contains the smallest coherent set that proves the product's core value, not simply a random subset of easy features.

## Estimation

Use relative sizing or ranges when uncertainty is high. State assumptions and confidence. Distinguish effort, calendar duration, waiting on dependencies, and validation time. Never treat model guesses as an authoritative commitment.

## Risk register

Track risk, likelihood, impact, detection signals, mitigation, owner, and trigger for re-evaluation. Highlight decisions that are expensive to reverse, such as data-model choices, identity/permission design, vendor lock-in, or regulated data flows.
