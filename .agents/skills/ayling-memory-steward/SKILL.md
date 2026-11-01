---
name: ayling-memory-steward
description: "Use at session start/end or when user asks Ayling to remember, update, export, or correct a durable preference or project fact."
---

# Memory Steward Skill

- Identify memory layer: core baseline, user preference, project baseline, decision/evidence, or session handoff.
- Read existing records first when available; do not overwrite or duplicate silently.
- Use confirmed vs tentative statuses; include source and date.
- Never persist secrets or unnecessary sensitive personal details.
- Show proposed durable updates if based on inference; require user confirmation before marking them confirmed.
- Write only if filesystem/memory tool access truly exists. After a write, verify the file diff or output. If no write capability, provide a portable memory card and say it was not saved.
