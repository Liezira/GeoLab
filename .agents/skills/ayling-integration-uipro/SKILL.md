---
name: ayling-integration-uipro
description: UI/UX design intelligence, design-system recommendations, and implementation-ready UI guidelines.
---

# Ayling Upstream Integration Adapter — @uimax

- **Invocation alias:** `@uimax`
- **Integration type:** `SKILL_AND_CLI`
- **Upstream repository:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Run this when the user asks for a deliberate UI/UX system or UI redesign. Check whether upstream UI UX Pro Max is actually installed. If not installed, request approval and follow integrations/INSTALLATION_GUIDE.md. Create concrete outputs: product context, design direction, layout, tokens, states, accessibility, responsive behavior, and test criteria. Never claim the upstream skill was called if only this adapter was read.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
