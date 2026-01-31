---
url: "https://docs.openclaw.ai/experiments/proposals/model-config"
title: "Model config - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/experiments/proposals/model-config#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Model Config (Exploration)](https://docs.openclaw.ai/experiments/proposals/model-config#model-config-exploration)
- [Motivation](https://docs.openclaw.ai/experiments/proposals/model-config#motivation)
- [Possible direction (high level)](https://docs.openclaw.ai/experiments/proposals/model-config#possible-direction-high-level)
- [Open questions](https://docs.openclaw.ai/experiments/proposals/model-config#open-questions)

# [​](https://docs.openclaw.ai/experiments/proposals/model-config\#model-config-exploration)  Model Config (Exploration)

This document captures **ideas** for future model configuration. It is not a
shipping spec. For current behavior, see:

- [Models](https://docs.openclaw.ai/concepts/models)
- [Model failover](https://docs.openclaw.ai/concepts/model-failover)
- [OAuth + profiles](https://docs.openclaw.ai/concepts/oauth)

## [​](https://docs.openclaw.ai/experiments/proposals/model-config\#motivation)  Motivation

Operators want:

- Multiple auth profiles per provider (personal vs work).
- Simple `/model` selection with predictable fallbacks.
- Clear separation between text models and image-capable models.

## [​](https://docs.openclaw.ai/experiments/proposals/model-config\#possible-direction-high-level)  Possible direction (high level)

- Keep model selection simple: `provider/model` with optional aliases.
- Let providers have multiple auth profiles, with an explicit order.
- Use a global fallback list so all sessions fail over consistently.
- Only override image routing when explicitly configured.

## [​](https://docs.openclaw.ai/experiments/proposals/model-config\#open-questions)  Open questions

- Should profile rotation be per-provider or per-model?
- How should the UI surface profile selection for a session?
- What is the safest migration path from legacy config keys?

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.