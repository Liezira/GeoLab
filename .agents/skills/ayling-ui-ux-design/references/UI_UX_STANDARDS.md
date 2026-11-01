# UI/UX Playbook

## Design from tasks, not decoration

Begin with target users, primary tasks, context of use, device constraints, frequency of use, error cost, data density, and accessibility needs. Define navigation and information hierarchy before polishing visuals.

## Required flow

1. Map user journeys and entry/exit points.
2. Define information architecture and navigation labels.
3. Sketch low-fidelity wireframes for high-impact flows.
4. Establish tokens and reusable components: typography, spacing, color roles, radii, elevation, sizing, interaction states.
5. Design responsive behavior and breakpoints according to actual content.
6. Specify empty, loading, success, error, disabled, offline, validation, and permission-denied states where relevant.
7. Review keyboard access, focus order, semantic structure, contrast, zoom/reflow, touch targets, and screen-reader labels.
8. Validate tasks with representative scenarios and gather user feedback when available.

## Common application patterns

- Data tables: search, filtering, sorting, pagination/virtualization if needed, clear column hierarchy, row actions, visible selection state, empty results, and responsive alternatives.
- Forms: labels, inline help, validation timing, preserving input when safe, field-level and summary errors, pending/success states, and disabled submit during duplicate submission.
- Dashboards: explain metric definitions, date range, freshness, units, and source where confusion is possible. Avoid decorative charts that do not support a decision.
- Destructive actions: explain impact, require appropriate confirmation, and consider undo/recovery.
- Authentication: clear error messaging without leaking account-existence details where that is a risk; accessible MFA and recovery flow when applicable.

## Visual quality checks

- Strong hierarchy; predictable alignment and spacing.
- Readable contrast, restrained use of accent color, and consistent type scale.
- Clear focus/hover/pressed/disabled states.
- Works with realistic long text, large datasets, empty data, slow network, small viewport, and keyboard-only input.
- Avoid treating animation as a substitute for clarity or adding motion that harms performance/accessibility.

## UI acceptance criteria template

- User task and target role:
- Happy path:
- Empty/loading/error/success behavior:
- Validation and permission behavior:
- Responsive behavior:
- Accessibility checks:
- Acceptance examples:
