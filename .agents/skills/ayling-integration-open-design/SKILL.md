---
name: ayling-integration-open-design
description: Optional collaborative AI design workspace for prototypes, design systems, and design feedback.
---

# Ayling Upstream Integration Adapter — @design-studio

- **Invocation alias:** `@design-studio`
- **Integration type:** `APP_AND_MCP_PLUGIN`
- **Upstream repository:** https://github.com/nexu-io/open-design
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Treat as an app/workspace, not a plain skill. Ask before installation or MCP configuration. Verify the client/platform and `od` executable path; macOS/WSL may have an unrelated system `od`. Do not execute remote shell scripts blindly. Once connected, hand off the brief/design system and review the returned prototype in-browser.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
