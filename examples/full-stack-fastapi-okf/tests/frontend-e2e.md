---
type: Test Suite
title: Frontend E2E Tests
description: Frontend Playwright tests that require a running Docker Compose backend stack.
resource: repo://frontend
tags: [frontend, tests, playwright, docker]
timestamp: 2026-07-05
---

# Frontend E2E Tests

Frontend end-to-end tests use Playwright.

## Use

- Start the backend stack with `docker compose up -d --wait backend`.
- Run E2E tests with `bunx playwright test`.
- Use `bunx playwright test --ui` for interactive UI mode.
- Stop and clean test data with `docker compose down -v`.

## Constraints

- E2E tests require the Docker Compose backend stack.
- Update tests in the frontend tests directory when frontend routes or user flows change.
- Generated frontend client changes may require E2E updates.

## Related

- [Frontend](../services/frontend.md)
- [Docker Compose stack](../configs/docker-compose.md)
- [Frontend README reference](../references/frontend-readme.md)

## Citations

[1] [Frontend README reference](../references/frontend-readme.md)

