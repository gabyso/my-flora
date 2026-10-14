# Architecture

## System context

The Expo mobile client calls a REST API. Fastify owns business orchestration,
resource ownership checks, persistence, image storage boundaries, and AI
provider calls. PostgreSQL stores relational data; object storage will store
images. Shared Zod contracts are the trust boundary between applications.

## Workspace boundaries

- apps/mobile: navigation, presentation, device capabilities, i18n, and API hooks.
- apps/api: HTTP transport, application services, repositories, and providers.
- packages/shared: domain enums, API contracts, and structured AI result schemas.
- packages/config: shared TypeScript configuration only.

Features should be organized vertically inside each application. Route and
screen files stay thin, while feature modules own their focused behavior.

## Request flow

Mobile feature hook -> API client -> Fastify route -> service -> repository or
provider -> validated response. External data is parsed with Zod before use.

## Data model direction

The planned relational model contains User, Plant, PlantPhoto, PlantScan,
CareAction, and Reminder. Care actions will use explicit event types. Photos
will store object-storage metadata and URLs, never image bytes or base64 in
PostgreSQL.

## AI boundary

Application services will depend on a PlantAnalysisProvider interface. Provider
adapters must return the shared structured result and the backend must validate
it before persistence or delivery. No provider secret or SDK belongs in mobile.

## Authentication boundary

Authentication will be introduced as an API adapter that establishes a user
identity for routes. Business services receive that identity explicitly and
enforce resource ownership without depending on a managed-auth vendor.
