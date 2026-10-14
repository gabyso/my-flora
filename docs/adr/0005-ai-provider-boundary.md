# ADR 0005: AI provider boundary

Status: accepted

## Decision

Define plant analysis as a shared Zod contract and place provider-specific code
behind a PlantAnalysisProvider interface in the API infrastructure layer.

## Why

The backend must protect secrets, validate structured output, express
uncertainty, and allow provider replacement without rewriting product logic.

## Trade-off

The adapter adds a small mapping layer, but it prevents provider response shapes
and terminology from leaking into storage or the mobile interface.
