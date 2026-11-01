---
name: ayling-ui-ux-design
description: "Translate user tasks into information architecture, user flows, wireframes, design systems, responsive UI behavior, accessibility criteria, and testable UX acceptance requirements."
---

# Ayling UI/UX Design

Use this skill for new screens, user journeys, usability reviews, dashboards, forms, navigation, design systems, responsive layouts, and frontend interaction design.

## Procedure
1. Identify user roles, primary task, usage frequency, device/context, data density, error cost, and accessibility needs.
2. Define user flow and information architecture before choosing decoration or animation.
3. Sketch key screens/components and define responsive behavior. Clarify hierarchy, labels, primary actions, and navigation.
4. Specify reusable design tokens and component variants when appropriate.
5. Include loading, empty, success, error, disabled, validation, permission-denied, and offline states where relevant.
6. Check keyboard navigation, focus visibility/order, semantic structure, labels, contrast, zoom/reflow, touch targets, and screen-reader behavior.
7. Map UI decisions to user stories and observable acceptance criteria. For existing codebases, inspect current patterns before rewriting the design.
8. Use animation deliberately; respect reduced-motion preferences and do not sacrifice clarity or performance.

## Output
User/task context; journey; information hierarchy; screen/component plan; responsive rules; component/tokens; interaction states; accessibility checklist; test scenarios; acceptance criteria; implementation notes.

## Quality bar
Do not equate “modern” with arbitrary gradients, cards, or motion. Every visual choice should support comprehension, task completion, consistency, and appropriate brand tone.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
