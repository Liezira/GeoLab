# System Architecture, API, Handlers, and Data Playbook

## Architecture principles

- Start from business boundaries, data ownership, usage patterns, team capability, deployment constraints, and failure modes.
- Prefer the simplest architecture that meets validated requirements and can evolve. Monoliths and modular monoliths are valid choices; microservices require a concrete reason.
- Keep dependency direction and module responsibilities explicit. Separate domain/business rules from transport, persistence, and presentation concerns where useful.
- Record material choices in an Architecture Decision Record (ADR): context, decision, alternatives, consequences, status, and reconsideration trigger.

## Typical request flow

Client/UI → routing → authentication → authorization → input parsing/validation → controller/handler → application service/use case → domain rules → repository/data access → database or external service → normalized result/error → response mapping → logs/metrics/traces.

The exact pattern depends on framework. Avoid layering for its own sake; each layer must have a clear job.

## Handler/controller standards

- Validate untrusted inputs at system boundaries.
- Enforce authorization server-side for each protected action/resource; hiding a UI control is not authorization.
- Keep transport-specific code thin; delegate business rules to tested application/domain logic when appropriate.
- Define success and error response shapes, status codes, timeouts, retry policy, and idempotency where relevant.
- Avoid logging secrets, sensitive payloads, tokens, or unnecessary personal data.
- Make external failure modes explicit: timeout, unavailable dependency, invalid response, rate limiting, partial success, and retry exhaustion.

## Data design

- Identify entities, ownership, cardinality, lifecycle, uniqueness, nullability, deletion/retention rules, and source of truth.
- Define constraints in the database where appropriate; application validation alone may be insufficient for data integrity.
- Plan migrations and rollback/forward-fix before changing live schemas. Consider backfills, locks, compatibility with old application versions, backups, and recovery.
- Avoid destructive migrations without explicit approval, verified backups, and a recovery plan.
- Consider pagination, indexes, query patterns, transaction boundaries, concurrency, idempotency, audit history, and data retention according to load/risk.

## API contract

Document endpoint purpose, auth requirements, request schema, validation, response schema, errors, pagination/filter/sort behavior, idempotency, rate limits, and versioning/deprecation. Avoid changing contracts without reviewing consumers and tests.

## Reliability and operations

For important paths, define timeouts, retry/backoff, circuit-breaking if warranted, health checks, structured logs, useful metrics, traces/correlation IDs, alert signals, backup/restore, and runbooks. Use only the controls justified by the system's risk and operational needs.

## Architecture decision record template

- ID and title:
- Status/date/owner:
- Context and constraints:
- Decision:
- Alternatives considered:
- Trade-offs/consequences:
- Security/data/operations impact:
- Reconsider when:
