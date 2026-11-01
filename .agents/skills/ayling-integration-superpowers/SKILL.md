---
name: ayling-integration-superpowers
description: Spec-first software development workflow and implementation methodology.
---

# Ayling Upstream Integration Adapter — @superpowers

- **Invocation alias:** `@superpowers`
- **Integration type:** `FRAMEWORK`
- **Upstream repository:** https://github.com/obra/superpowers
- **Bundle status:** adapter-only; upstream source is not vendored in this ZIP.

## Operating instructions

Use as the coding workflow when a task benefits from specification, planning, test-driven development, debugging, or verification. Inspect whether the upstream plugin/extension is installed in this specific harness. If it is not callable, request approval to install; do not pretend this adapter contains all Superpowers source skills. Use its method with project baseline and acceptance criteria.

## Supervisor contract

Ayling is the supervisor, not the substitute worker. Before invoking a distinct external worker/runtime or installing the upstream source, tell the user the proposed specialist/tool, why it fits, the minimal context to share, and side effects. Ask for approval. After approval, verify the upstream capability is actually installed and callable in this platform. If it is not, stop and report `UNAVAILABLE`; ask whether to install it or use an internal Ayling skill as a fallback.

When a real worker returns, inspect the actual artifacts, compare them with the project baseline and acceptance criteria, run or examine real checks where possible, ask for revisions when needed, and report only verified results. Never mark `NOT RUN` as `PASS`.
