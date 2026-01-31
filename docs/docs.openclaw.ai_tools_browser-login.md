---
url: "https://docs.openclaw.ai/tools/browser-login"
title: "Browser login - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/tools/browser-login#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Browser login + X/Twitter posting](https://docs.openclaw.ai/tools/browser-login#browser-login-%2B-x%2Ftwitter-posting)
- [Manual login (recommended)](https://docs.openclaw.ai/tools/browser-login#manual-login-recommended)
- [Which Chrome profile is used?](https://docs.openclaw.ai/tools/browser-login#which-chrome-profile-is-used)
- [X/Twitter: recommended flow](https://docs.openclaw.ai/tools/browser-login#x%2Ftwitter%3A-recommended-flow)
- [Sandboxing + host browser access](https://docs.openclaw.ai/tools/browser-login#sandboxing-%2B-host-browser-access)

# [​](https://docs.openclaw.ai/tools/browser-login\#browser-login-+-x/twitter-posting)  Browser login + X/Twitter posting

## [​](https://docs.openclaw.ai/tools/browser-login\#manual-login-recommended)  Manual login (recommended)

When a site requires login, **sign in manually** in the **host** browser profile (the openclaw browser).Do **not** give the model your credentials. Automated logins often trigger anti‑bot defenses and can lock the account.Back to the main browser docs: [Browser](https://docs.openclaw.ai/tools/browser).

## [​](https://docs.openclaw.ai/tools/browser-login\#which-chrome-profile-is-used)  Which Chrome profile is used?

OpenClaw controls a **dedicated Chrome profile** (named `openclaw`, orange‑tinted UI). This is separate from your daily browser profile.Two easy ways to access it:

1. **Ask the agent to open the browser** and then log in yourself.
2. **Open it via CLI**:

Copy

```
openclaw browser start
openclaw browser open https://x.com
```

If you have multiple profiles, pass `--browser-profile <name>` (the default is `openclaw`).

## [​](https://docs.openclaw.ai/tools/browser-login\#x/twitter:-recommended-flow)  X/Twitter: recommended flow

- **Read/search/threads:** use the **bird** CLI skill (no browser, stable).

  - Repo: [https://github.com/steipete/bird](https://github.com/steipete/bird)
- **Post updates:** use the **host** browser (manual login).

## [​](https://docs.openclaw.ai/tools/browser-login\#sandboxing-+-host-browser-access)  Sandboxing + host browser access

Sandboxed browser sessions are **more likely** to trigger bot detection. For X/Twitter (and other strict sites), prefer the **host** browser.If the agent is sandboxed, the browser tool defaults to the sandbox. To allow host control:

Copy

```
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main",
        browser: {
          allowHostControl: true
        }
      }
    }
  }
}
```

Then target the host browser:

Copy

```
openclaw browser open https://x.com --browser-profile openclaw --target host
```

Or disable sandboxing for the agent that posts updates.

[Browser](https://docs.openclaw.ai/tools/browser) [Chrome extension](https://docs.openclaw.ai/tools/chrome-extension)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.