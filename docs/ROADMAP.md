# Roadmap

## Phase 0 — Planning

Complete. Product requirements, architecture, roadmap, and focused ADRs define
the initial boundaries.

## Phase 1 — Foundation

Create the workspace, mobile shell, API health route, shared validation,
PostgreSQL and Prisma configuration, bilingual i18n, directional layout, and
quality gates.

## Phase 2 — Product UI with API-backed fixtures

Build Home, plant collection, plant detail, scan preparation, reminders, and
profile screens against intentionally mocked API repositories. Add routing and
forms without persistence.

Current progress: the Home, searchable plant collection, Add Plant form, and
Plant Details flow are implemented against an in-memory API repository.

## Phase 3 — Persistent backend

Add the initial migration, resource ownership, plant and care APIs, repository
integration tests, and database-backed fixtures.

## Phase 4 — Camera and images

Add permission flows, camera and gallery selection, client-side optimization,
signed uploads, object storage, and upload lifecycle handling.

## Phase 5 — AI analysis

Implement one multimodal provider adapter, structured output validation,
analysis orchestration, uncertainty-aware presentation, and scan history.

## Phase 6 — Reminders and polish

Add local or push notification delivery, accessibility audit, measured
performance work, error recovery, and restrained motion.
