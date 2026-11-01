---
name: ayling-integration-archify
description: Interactive diagrams generated from ideas, plans, and codebases.
---

# Ayling Upstream Integration Adapter — @diagram

- **Invocation alias:** `@diagram`
- **Integration type:** `SKILL`
- **Upstream repository:** https://github.com/tt-a1i/archify
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Use for architecture, data flow, API journeys, process maps, or other diagrams. Base nodes/edges on verified source files, requirements, or approved design. Cite or link source where supported. A diagram is a visualization, not proof of implementation/runtime correctness. Upstream documents npx skills installation.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
