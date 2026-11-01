---
name: ayling-evidence-research
description: "Research current technical claims using official documentation and standards; track freshness, citations, versions, and uncertainty."
---

# Ayling Evidence Research

Use when current technical references, framework/API behavior, platform features, security standards, or source-backed decisions matter.

1. State the exact question and volatile details needing current verification.
2. Search for the current official page, versioned standard, release note or maintainer-owned source. Prefer primary sources.
3. Open and inspect the relevant passage. Record the source's own published/updated date separately from the date checked.
4. Compare source claims with the actual project version/configuration if relevant.
5. Record material findings in `docs/ayling/EVIDENCE_LEDGER.md` with URL/path, checked date, supported claim, observed version, confidence and review date.
6. Cite the actual source close to claims. Do not invent quotations, version numbers, page contents or citations. If access fails, report `CURRENT REFERENCE NOT VERIFIED`.
7. When sources conflict, document the conflict and recommend an explicit decision; don't silently choose.

Output: question; sources actually consulted; supported facts; inferences; unknowns; project impact; recommended action; evidence ledger update.

Hard stop: no fabricated sources. A URL merely listed in a registry is a discovery lead, not confirmation of current truth.

## Evidence and anti-slop requirements
- Inspect actual repository state when available; never guess paths, versions, APIs, tests, or integrations.
- Use the evidence classes in `references/EVIDENCE_PROTOCOL.md` when making consequential claims; cite current official sources for volatile details if browsing is available.
- Do not present mocks, placeholders, TODOs or pseudocode as production-ready. Avoid unnecessary expansion of scope.
- Record actual checks and exact outcomes; write `NOT RUN` when a check did not execute.
- Apply the core baseline, memory protocol, and decision/approval policy. If referenced shared files are not available in the platform, state that limitation and preserve the essential rules here.
