---
url: "https://docs.openclaw.ai/reference/test"
title: "Test - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/reference/test#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Tests](https://docs.openclaw.ai/reference/test#tests)
- [Model latency bench (local keys)](https://docs.openclaw.ai/reference/test#model-latency-bench-local-keys)
- [Onboarding E2E (Docker)](https://docs.openclaw.ai/reference/test#onboarding-e2e-docker)
- [QR import smoke (Docker)](https://docs.openclaw.ai/reference/test#qr-import-smoke-docker)

# [​](https://docs.openclaw.ai/reference/test\#tests)  Tests

- Full testing kit (suites, live, Docker): [Testing](https://docs.openclaw.ai/testing)
- `pnpm test:force`: Kills any lingering gateway process holding the default control port, then runs the full Vitest suite with an isolated gateway port so server tests don’t collide with a running instance. Use this when a prior gateway run left port 18789 occupied.
- `pnpm test:coverage`: Runs Vitest with V8 coverage. Global thresholds are 70% lines/branches/functions/statements. Coverage excludes integration-heavy entrypoints (CLI wiring, gateway/telegram bridges, webchat static server) to keep the target focused on unit-testable logic.
- `pnpm test:e2e`: Runs gateway end-to-end smoke tests (multi-instance WS/HTTP/node pairing).
- `pnpm test:live`: Runs provider live tests (minimax/zai). Requires API keys and `LIVE=1` (or provider-specific `*_LIVE_TEST=1`) to unskip.

## [​](https://docs.openclaw.ai/reference/test\#model-latency-bench-local-keys)  Model latency bench (local keys)

Script: [`scripts/bench-model.ts`](https://github.com/openclaw/openclaw/blob/main/scripts/bench-model.ts)Usage:

- `source ~/.profile && pnpm tsx scripts/bench-model.ts --runs 10`
- Optional env: `MINIMAX_API_KEY`, `MINIMAX_BASE_URL`, `MINIMAX_MODEL`, `ANTHROPIC_API_KEY`
- Default prompt: “Reply with a single word: ok. No punctuation or extra text.”

Last run (2025-12-31, 20 runs):

- minimax median 1279ms (min 1114, max 2431)
- opus median 2454ms (min 1224, max 3170)

## [​](https://docs.openclaw.ai/reference/test\#onboarding-e2e-docker)  Onboarding E2E (Docker)

Docker is optional; this is only needed for containerized onboarding smoke tests.Full cold-start flow in a clean Linux container:

Copy

```
scripts/e2e/onboard-docker.sh
```

This script drives the interactive wizard via a pseudo-tty, verifies config/workspace/session files, then starts the gateway and runs `openclaw health`.

## [​](https://docs.openclaw.ai/reference/test\#qr-import-smoke-docker)  QR import smoke (Docker)

Ensures `qrcode-terminal` loads under Node 22+ in Docker:

Copy

```
pnpm test:docker:qr
```

[Device models](https://docs.openclaw.ai/reference/device-models) [RELEASING](https://docs.openclaw.ai/reference/RELEASING)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.