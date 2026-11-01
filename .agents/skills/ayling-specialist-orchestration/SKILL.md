---
name: ayling-specialist-orchestration
description: "Use when deciding whether to call a separate specialist agent, route work to a subagent, or combine specialist outputs."
---

# Specialist Orchestration Skill

Follow `orchestration/SPECIALIST_ROUTER.md`, `AGENT_REGISTRY.yaml`, and `HANDOFF_CONTRACT.md` exactly.

- Check actual callable tool/subagent availability.
- Ask user approval before separate-agent delegation, unless explicitly authorized in current request.
- Share minimum necessary context and disclose third-party context sharing.
- If only a bundled skill is used in the same context, call it a skill/mode, not an agent.
- If no separate agent exists, state that and offer direct work.
- Validate outputs for accuracy, tone, sources, privacy, baseline conflicts, and quality before delivering.
