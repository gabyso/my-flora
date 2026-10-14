# ADR 0001: pnpm workspace monorepo

Status: accepted

## Decision

Use a pnpm workspace with apps/mobile, apps/api, packages/shared, and
packages/config.

## Why

One repository makes contract changes atomic and keeps quality tooling
consistent while the team and product are small.

## Trade-off

Workspace-aware mobile bundling and deployment require care. The shared package
therefore exports TypeScript source for the two private consumers instead of
adding a premature publishing pipeline.
