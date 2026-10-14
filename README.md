# My Flora

My Flora is a calm, bilingual plant-care companion built as an Expo and Fastify
monorepo. The current product slice supports adding plants, browsing and
searching the collection, and opening plant details in English and Hebrew.

## Requirements

- Node.js 22.13 or newer
- pnpm 10
- PostgreSQL for future persistence work
- Expo-compatible iOS or Android environment

## Start locally

1. Copy apps/api/.env.example to apps/api/.env.
2. Copy apps/mobile/.env.example to apps/mobile/.env.
3. Run pnpm install.
4. Run pnpm dev.

For a physical phone, set EXPO_PUBLIC_API_URL to the development machine's LAN
address. Android emulators normally use http://10.0.2.2:3000.

## Demo reset and reseed

To reset local API data and seed the test plants with photos in one command:

```bash
pnpm demo:reset
```

This command force-resets the API database schema and inserts the `TEST - ...`
plants used for UI and flow testing.

## Validation

Run pnpm validate for formatting, linting, strict TypeScript checks, and tests.
