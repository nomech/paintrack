# ADR-0008: Use trunk-based development

## Status
Accepted

## Context
To keep delivery frequent and integration risk low, the team needs a branching strategy that encourages short-lived branches, fast feedback, and continuous integration.

## Decision
We will follow trunk-based development.

- `main` is the trunk and remains releasable.
- Work is done in short-lived branches and merged frequently through pull requests.
- CI checks and code review are required before merge.
- Large changes are broken into smaller increments and can use feature flags when needed.

## Consequences
- Integration happens continuously, reducing long-lived merge conflicts.
- Smaller pull requests improve review quality and cycle time.
- The team must maintain strong discipline on CI health and incremental delivery.
