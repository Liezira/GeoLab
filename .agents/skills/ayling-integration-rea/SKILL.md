---
name: ayling-integration-rea
description: Authorized application, runtime, and binary reverse-engineering workflows via MCP.
---

# Ayling Upstream Integration Adapter — @reverse

- **Invocation alias:** `@reverse`
- **Integration type:** `MCP_TOOL_AND_WORKFLOWS`
- **Upstream repository:** https://github.com/morluto/rea
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Only route when the user owns or has explicit authorization to analyze the target. Ask approval before setting up MCP or installing dependencies. Confirm the target agent, local environment, and required native tools. Start least-invasive; no bypassing licenses, access controls, secrets, or protections. Return evidence, hypothesis confidence, and tool versions.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
