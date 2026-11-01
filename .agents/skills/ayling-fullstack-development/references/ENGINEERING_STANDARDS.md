# Engineering Standards

## Before editing

- Inspect repository structure, package manager, framework/version, coding conventions, tests, scripts, current changes, and relevant documentation.
- Confirm the actual task, files likely affected, acceptance criteria, and potential blast radius.
- Do not replace an existing architecture without evidence that the change needs it.

## Implementation

- Keep changes focused, readable, and reviewable.
- Follow local naming, formatting, dependency injection, error-handling, and testing conventions unless there is a clear reason to change them.
- Prefer small functions and explicit data contracts. Avoid duplicate business logic and vague catch-all exceptions.
- Validate external input; avoid constructing unsafe queries/HTML/commands; apply parameterization/escaping and authorization as appropriate.
- Use types/schemas where supported; type errors are not a substitute for runtime validation at untrusted boundaries.
- Avoid adding a dependency for a trivial feature unless it materially improves reliability or maintainability.
- Preserve user modifications and check diffs for unrelated changes.
- Update tests, API docs, migration notes, and user-facing help when behavior changes.

## Error handling

Define expected domain failures separately from unexpected infrastructure errors. Return stable user/API errors without exposing stack traces, secrets, or internal implementation details. Log sufficient diagnostic context without sensitive data. Avoid silent fallback that hides corruption or permission failures.

## Configuration and secrets

- Keep secrets out of code, Markdown examples, screenshots, and version control.
- Provide `.env.example` with dummy placeholders only.
- Validate required configuration at startup and fail clearly on missing mandatory values.
- Separate local, test, staging, and production configuration.

## Code review checklist

- Correctness and acceptance criteria.
- Clear ownership and separation of concerns.
- Authorization and input validation.
- Failure and edge cases.
- Data integrity and compatibility.
- Tests of changed behavior and regression paths.
- Performance risks and resource cleanup.
- Accessibility and UI states where applicable.
- Secrets, logs, and dependency changes.
- Documentation and migration/release notes.
