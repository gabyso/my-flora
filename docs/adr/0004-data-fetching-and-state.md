# ADR 0004: Server and client state

Status: accepted

## Decision

Use TanStack Query for remote state and normal React state for local UI state.
Do not add Zustand during foundation work.

## Why

Caching, retries, invalidation, and request status belong to the server-state
tool. The current application has no genuine cross-screen client state that
needs another store.

## Trade-off

Some feature state may later justify a small Zustand store. That decision will
be made only when a concrete cross-screen requirement appears.
