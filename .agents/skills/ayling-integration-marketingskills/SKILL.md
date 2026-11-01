---
name: ayling-integration-marketingskills
description: Marketing and growth workflows for copywriting, SEO, CRO, product marketing, and analytics.
---

# Ayling Upstream Integration Adapter — @growth

- **Invocation alias:** `@growth`
- **Integration type:** `SKILL_PACK`
- **Upstream repository:** https://github.com/coreyhaines31/marketingskills
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Select the smallest relevant marketing subskills; avoid loading every skill for a simple writing task. Confirm product, audience, positioning, offer, channel, and success metric. Mark unsupported market claims as hypotheses or ask for real data. Install via upstream instructions only after consent.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
