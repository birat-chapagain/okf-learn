---
type: Runbook
title: Deployment
description: Deployment workflow using Docker Compose, Traefik, required environment variables, GitHub Actions environments, and deployment secrets.
resource: repo://deployment.md
tags: [deployment, docker, compose, traefik, github-actions, secrets]
timestamp: 2026-07-05
---

# Deployment

Use this runbook before deploying the FastAPI project to a remote server.

## Steps

1. Prepare a remote server and DNS records.
2. Configure wildcard subdomains for app components.
3. Install Docker Engine on the server.
4. Set up the public Traefik proxy and `traefik-public` network.
5. Set required environment variables and secrets.
6. Deploy with Docker Compose.
7. Configure GitHub Actions environments and secrets if using CD.

## Constraints

- Do not deploy with `changethis` values for secrets.
- Production deployment expects a Traefik proxy handling external HTTP/HTTPS.
- Use `compose.yml` for production instead of local overrides.
- Deployment workflows use environment-specific GitHub secrets.

## Related

- [Environment variables](../configs/environment.md)
- [Docker Compose stack](../configs/docker-compose.md)
- [Deployment docs reference](../references/deployment-docs.md)

## Citations

[1] [Deployment docs reference](../references/deployment-docs.md)

