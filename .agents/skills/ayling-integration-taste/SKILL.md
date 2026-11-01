---
name: ayling-integration-taste
description: Art-directed frontend design with references, attributed imagery, and browser-based review.
---

# Ayling Upstream Integration Adapter — @taste

- **Invocation alias:** `@taste`
- **Integration type:** `SKILL`
- **Upstream repository:** https://github.com/Leonxlnx/taste-skill
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Use for a design task needing a distinctive direction and actual browser inspection. Verify Node 22+, Chrome/Edge/Chromium, network and image-source attribution. Ask before using external asset discovery if this changes the privacy scope. Require screenshots or actual browser evidence, not just claims. Upstream install name currently documented as design-taste-frontend.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
