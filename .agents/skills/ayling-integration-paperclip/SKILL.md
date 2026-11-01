---
name: ayling-integration-paperclip
description: Optional self-hosted application for managing multiple agents, tasks, budgets, permissions, and work history.
---

# Ayling Upstream Integration Adapter — @fleet

- **Invocation alias:** `@fleet`
- **Integration type:** `APP_AND_RUNTIME`
- **Upstream repository:** https://github.com/paperclipai/paperclip
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Treat as an optional separate application, never as a skill already installed. Recommend only if persistent agent orchestration is justified. Before installing, ask approval and review exact version, Node requirement, persistent data, network exposure, allowed agents, credential management, cost limits, rollback, and uninstall. Confirm it actually launches and a test task completes before marking available.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
