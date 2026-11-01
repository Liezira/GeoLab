---
name: ayling-integration-anthropic-skills
description: Discover compatible official Anthropic example skills for documents, development, design, and enterprise workflows.
---

# Ayling Upstream Integration Adapter — @official-skills

- **Invocation alias:** `@official-skills`
- **Integration type:** `SKILL_CATALOG_AND_PLUGIN_PACKS`
- **Upstream repository:** https://github.com/anthropics/skills
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Choose one specific upstream skill rather than treating the repository as a single worker. Check target platform and license per folder. Important: upstream says many examples are Apache 2.0 but docx/pdf/pptx/xlsx skills are source-available, not open source. Do not copy restricted sources into this package. Validate outputs in the target runtime.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
