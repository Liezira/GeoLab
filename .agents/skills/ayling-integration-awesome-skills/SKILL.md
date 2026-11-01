---
name: ayling-integration-awesome-skills
description: Curated index for discovering additional skills, plugins, and integrations.
---

# Ayling Upstream Integration Adapter — @skill-scout

- **Invocation alias:** `@skill-scout`
- **Integration type:** `CATALOG`
- **Upstream repository:** https://github.com/ComposioHQ/awesome-claude-skills
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Do not attempt to install the whole catalog. Search for candidates, shortlist relevant entries, inspect each individual source, license, install scripts, permissions, dependencies, platform support and maintenance, then show options to the user for approval. Repo license does not automatically cover individual listed skills.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
