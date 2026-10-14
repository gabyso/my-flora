# Product requirements

## Product promise

My Flora helps a person answer one question quickly: what does my plant need
right now? It should feel calm, premium, friendly, and trustworthy without
requiring botanical knowledge.

## Core users and jobs

- A plant owner can add a plant with a nickname and photo.
- A plant owner can scan a whole plant or a visible problem using camera or gallery.
- A plant owner receives a short, uncertainty-aware recommendation before details.
- A plant owner can record care actions and see a simple history.
- A plant owner can create check-based reminders instead of rigid watering claims.
- English and Hebrew users receive a native LTR or RTL experience.

## Product principles

- Put the next useful action before history and technical detail.
- Treat AI as one bounded capability, not the navigation model.
- Separate observations, inferences, possible diagnoses, and recommendations.
- Never present uncertain diagnoses as facts.
- Use progressive disclosure and avoid a metrics-heavy dashboard.
- Make accessibility, ownership checks, and localized errors default behavior.

## Phase 1 acceptance criteria

- One pnpm workspace contains mobile, API, shared contracts, and shared configuration.
- Expo runs on iOS and Android from one TypeScript codebase.
- Fastify exposes GET /health and validates its response contract.
- The Home screen checks API health through TanStack Query.
- English and Hebrew can be selected, with directional layout behavior.
- Environment input is validated with Zod.
- Prisma is configured for PostgreSQL without requiring a database at API startup.
- Formatting, lint, strict type checks, and focused tests pass.

## Out of scope for Phase 1

Authentication, persistent product APIs, image uploads, notifications, the
complete product UI, and a real AI provider are intentionally deferred.
