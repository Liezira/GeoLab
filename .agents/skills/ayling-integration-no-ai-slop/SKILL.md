---
name: ayling-integration-no-ai-slop
description: Editorial quality pass to remove formulaic AI writing patterns while preserving the author voice.
---

# Ayling Upstream Integration Adapter — @humanize

- **Invocation alias:** `@humanize`
- **Integration type:** `SKILL_AND_PLUGIN`
- **Upstream repository:** https://github.com/petergyang/no-ai-slop
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Review text for formulaic structure, empty claims, stock transitions, excessive contrasts, synthetic enthusiasm, repeated summaries, and voice flattening. Preserve facts, personal meaning, direct quotes, technical exactness, and intentional style. Return a concise diff/reasons. Upstream skill/plugin must be installed for full implementation.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
