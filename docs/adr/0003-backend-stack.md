# ADR 0003: Fastify, PostgreSQL, and Prisma

Status: accepted

## Decision

Use Node.js 22 LTS, Fastify 5, PostgreSQL, and Prisma ORM 7 behind feature-owned
repository modules.

## Why

Fastify offers a small, typed HTTP core and structured logging. PostgreSQL fits
the relational domain, and Prisma supplies migrations and type-safe persistence.

## Trade-off

Prisma adds generated code and an adapter layer. Keeping Prisma imports near
persistence prevents generated models from becoming API contracts.
