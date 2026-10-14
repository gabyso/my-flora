# ADR 0002: Expo mobile stack

Status: accepted

## Decision

Use stable Expo SDK 57, React Native 0.86, Expo Router, NativeWind 4, React Hook
Form, Zod, i18next, and react-i18next.

## Why

Expo provides one supported iOS and Android workflow. Expo Router gives a small
file-based navigation surface, and NativeWind supports a token-led design
without a large component dependency.

## Trade-off

Expo SDK versions intentionally pin React Native. NativeWind 5 remains preview,
so the stable v4 line is selected even though its Tailwind integration is older.
