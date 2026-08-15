# ADR-0001: Record architecture decisions

## Status
Accepted

## Context
As the project grows, architecture and process decisions need to be explicit, discoverable, and durable. Decision-making currently happens across issues and pull requests, which can make historical context hard to find later.

## Decision
We will use Architecture Decision Records (ADRs) to capture significant technical and ways-of-working decisions.

- ADR files are stored in `docs/adr`.
- ADRs use the Nygard template sections: Status, Context, Decision, Consequences.
- ADRs are numbered sequentially (`ADR-0001`, `ADR-0002`, ...).

## Consequences
- Decision rationale is easier to find for current and future contributors.
- Trade-offs are documented at the time decisions are made.
- Writing ADRs adds a small process overhead, but improves long-term maintainability.
