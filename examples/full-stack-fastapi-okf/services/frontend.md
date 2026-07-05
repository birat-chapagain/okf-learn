---
type: Service
title: Frontend
description: React frontend using Vite, TypeScript, TanStack Query, TanStack Router, Tailwind CSS, and a generated OpenAPI client.
resource: repo://frontend
tags: [frontend, react, vite, typescript, generated-client, tests]
timestamp: 2026-07-05
---

# Frontend

The frontend is the React application.

## Use

- Run local frontend development with `bun install` and `bun run dev`.
- The local development server runs at `http://localhost:5173`.
- The generated client lives under `frontend/src/client`.
- Regenerate the frontend client after backend OpenAPI schema changes.

## Constraints

- The live frontend server is recommended for local frontend development, not rebuilding the Docker image on every change.
- If backend API schema changes, regenerate and commit the frontend client.
- Frontend E2E tests require the Docker Compose backend stack.

## Related

- [Frontend E2E tests](../tests/frontend-e2e.md)
- [Backend API](backend.md)
- [Local development](../runbooks/local-development.md)
- [Frontend README reference](../references/frontend-readme.md)

## Citations

[1] [Frontend README reference](../references/frontend-readme.md)

