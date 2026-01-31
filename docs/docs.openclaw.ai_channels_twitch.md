---
url: "https://docs.openclaw.ai/channels/twitch"
title: "Twitch - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/channels/twitch#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Twitch (plugin)](https://docs.openclaw.ai/channels/twitch#twitch-plugin)
- [Plugin required](https://docs.openclaw.ai/channels/twitch#plugin-required)
- [Quick setup (beginner)](https://docs.openclaw.ai/channels/twitch#quick-setup-beginner)
- [What it is](https://docs.openclaw.ai/channels/twitch#what-it-is)
- [Setup (detailed)](https://docs.openclaw.ai/channels/twitch#setup-detailed)
- [Generate credentials](https://docs.openclaw.ai/channels/twitch#generate-credentials)
- [Configure the bot](https://docs.openclaw.ai/channels/twitch#configure-the-bot)
- [Access control (recommended)](https://docs.openclaw.ai/channels/twitch#access-control-recommended)
- [Token refresh (optional)](https://docs.openclaw.ai/channels/twitch#token-refresh-optional)
- [Multi-account support](https://docs.openclaw.ai/channels/twitch#multi-account-support)
- [Access control](https://docs.openclaw.ai/channels/twitch#access-control)
- [Role-based restrictions](https://docs.openclaw.ai/channels/twitch#role-based-restrictions)
- [Allowlist by User ID (most secure)](https://docs.openclaw.ai/channels/twitch#allowlist-by-user-id-most-secure)
- [Combined allowlist + roles](https://docs.openclaw.ai/channels/twitch#combined-allowlist-%2B-roles)
- [Disable @mention requirement](https://docs.openclaw.ai/channels/twitch#disable-%40mention-requirement)
- [Troubleshooting](https://docs.openclaw.ai/channels/twitch#troubleshooting)
- [Bot doesn’t respond to messages](https://docs.openclaw.ai/channels/twitch#bot-doesn%E2%80%99t-respond-to-messages)
- [Token issues](https://docs.openclaw.ai/channels/twitch#token-issues)
- [Token refresh not working](https://docs.openclaw.ai/channels/twitch#token-refresh-not-working)
- [Config](https://docs.openclaw.ai/channels/twitch#config)
- [Tool actions](https://docs.openclaw.ai/channels/twitch#tool-actions)
- [Safety & ops](https://docs.openclaw.ai/channels/twitch#safety-%26-ops)
- [Limits](https://docs.openclaw.ai/channels/twitch#limits)

# [​](https://docs.openclaw.ai/channels/twitch\#twitch-plugin)  Twitch (plugin)

Twitch chat support via IRC connection. OpenClaw connects as a Twitch user (bot account) to receive and send messages in channels.

## [​](https://docs.openclaw.ai/channels/twitch\#plugin-required)  Plugin required

Twitch ships as a plugin and is not bundled with the core install.Install via CLI (npm registry):

Copy

```
openclaw plugins install @openclaw/twitch
```

Local checkout (when running from a git repo):

Copy

```
openclaw plugins install ./extensions/twitch
```

Details: [Plugins](https://docs.openclaw.ai/plugin)

## [​](https://docs.openclaw.ai/channels/twitch\#quick-setup-beginner)  Quick setup (beginner)

1. Create a dedicated Twitch account for the bot (or use an existing account).
2. Generate credentials: [Twitch Token Generator](https://twitchtokengenerator.com/)
   - Select **Bot Token**
   - Verify scopes `chat:read` and `chat:write` are selected
   - Copy the **Client ID** and **Access Token**
3. Find your Twitch user ID: [https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/](https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/)
4. Configure the token:
   - Env: `OPENCLAW_TWITCH_ACCESS_TOKEN=...` (default account only)
   - Or config: `channels.twitch.accessToken`
   - If both are set, config takes precedence (env fallback is default-account only).
5. Start the gateway.

**⚠️ Important:** Add access control (`allowFrom` or `allowedRoles`) to prevent unauthorized users from triggering the bot. `requireMention` defaults to `true`.Minimal config:

Copy

```
{
  channels: {
    twitch: {
      enabled: true,
      username: "openclaw",              // Bot's Twitch account
      accessToken: "oauth:abc123...",    // OAuth Access Token (or use OPENCLAW_TWITCH_ACCESS_TOKEN env var)
      clientId: "xyz789...",             // Client ID from Token Generator
      channel: "vevisk",                 // Which Twitch channel's chat to join (required)
      allowFrom: ["123456789"]           // (recommended) Your Twitch user ID only - get it from https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/twitch\#what-it-is)  What it is

- A Twitch channel owned by the Gateway.
- Deterministic routing: replies always go back to Twitch.
- Each account maps to an isolated session key `agent:<agentId>:twitch:<accountName>`.
- `username` is the bot’s account (who authenticates), `channel` is which chat room to join.

## [​](https://docs.openclaw.ai/channels/twitch\#setup-detailed)  Setup (detailed)

### [​](https://docs.openclaw.ai/channels/twitch\#generate-credentials)  Generate credentials

Use [Twitch Token Generator](https://twitchtokengenerator.com/):

- Select **Bot Token**
- Verify scopes `chat:read` and `chat:write` are selected
- Copy the **Client ID** and **Access Token**

No manual app registration needed. Tokens expire after several hours.

### [​](https://docs.openclaw.ai/channels/twitch\#configure-the-bot)  Configure the bot

**Env var (default account only):**

Copy

```
OPENCLAW_TWITCH_ACCESS_TOKEN=oauth:abc123...
```

**Or config:**

Copy

```
{
  channels: {
    twitch: {
      enabled: true,
      username: "openclaw",
      accessToken: "oauth:abc123...",
      clientId: "xyz789...",
      channel: "vevisk"
    }
  }
}
```

If both env and config are set, config takes precedence.

### [​](https://docs.openclaw.ai/channels/twitch\#access-control-recommended)  Access control (recommended)

Copy

```
{
  channels: {
    twitch: {
      allowFrom: ["123456789"],       // (recommended) Your Twitch user ID only
      allowedRoles: ["moderator"]     // Or restrict to roles
    }
  }
}
```

**Available roles:**`"moderator"`, `"owner"`, `"vip"`, `"subscriber"`, `"all"`.**Why user IDs?** Usernames can change, allowing impersonation. User IDs are permanent.Find your Twitch user ID: [https://www.streamweasels.com/tools/convert-twitch-username-%20to-user-id/](https://www.streamweasels.com/tools/convert-twitch-username-%20to-user-id/) (Convert your Twitch username to ID)

## [​](https://docs.openclaw.ai/channels/twitch\#token-refresh-optional)  Token refresh (optional)

Tokens from [Twitch Token Generator](https://twitchtokengenerator.com/) cannot be automatically refreshed - regenerate when expired.For automatic token refresh, create your own Twitch application at [Twitch Developer Console](https://dev.twitch.tv/console) and add to config:

Copy

```
{
  channels: {
    twitch: {
      clientSecret: "your_client_secret",
      refreshToken: "your_refresh_token"
    }
  }
}
```

The bot automatically refreshes tokens before expiration and logs refresh events.

## [​](https://docs.openclaw.ai/channels/twitch\#multi-account-support)  Multi-account support

Use `channels.twitch.accounts` with per-account tokens. See [`gateway/configuration`](https://docs.openclaw.ai/gateway/configuration) for the shared pattern.Example (one bot account in two channels):

Copy

```
{
  channels: {
    twitch: {
      accounts: {
        channel1: {
          username: "openclaw",
          accessToken: "oauth:abc123...",
          clientId: "xyz789...",
          channel: "vevisk"
        },
        channel2: {
          username: "openclaw",
          accessToken: "oauth:def456...",
          clientId: "uvw012...",
          channel: "secondchannel"
        }
      }
    }
  }
}
```

**Note:** Each account needs its own token (one token per channel).

## [​](https://docs.openclaw.ai/channels/twitch\#access-control)  Access control

### [​](https://docs.openclaw.ai/channels/twitch\#role-based-restrictions)  Role-based restrictions

Copy

```
{
  channels: {
    twitch: {
      accounts: {
        default: {
          allowedRoles: ["moderator", "vip"]
        }
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/channels/twitch\#allowlist-by-user-id-most-secure)  Allowlist by User ID (most secure)

Copy

```
{
  channels: {
    twitch: {
      accounts: {
        default: {
          allowFrom: ["123456789", "987654321"]
        }
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/channels/twitch\#combined-allowlist-+-roles)  Combined allowlist + roles

Users in `allowFrom` bypass role checks:

Copy

```
{
  channels: {
    twitch: {
      accounts: {
        default: {
          allowFrom: ["123456789"],
          allowedRoles: ["moderator"]
        }
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/channels/twitch\#disable-@mention-requirement)  Disable @mention requirement

By default, `requireMention` is `true`. To disable and respond to all messages:

Copy

```
{
  channels: {
    twitch: {
      accounts: {
        default: {
          requireMention: false
        }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/twitch\#troubleshooting)  Troubleshooting

First, run diagnostic commands:

Copy

```
openclaw doctor
openclaw channels status --probe
```

### [​](https://docs.openclaw.ai/channels/twitch\#bot-doesn%E2%80%99t-respond-to-messages)  Bot doesn’t respond to messages

**Check access control:** Temporarily set `allowedRoles: ["all"]` to test.**Check the bot is in the channel:** The bot must join the channel specified in `channel`.

### [​](https://docs.openclaw.ai/channels/twitch\#token-issues)  Token issues

**“Failed to connect” or authentication errors:**

- Verify `accessToken` is the OAuth access token value (typically starts with `oauth:` prefix)
- Check token has `chat:read` and `chat:write` scopes
- If using token refresh, verify `clientSecret` and `refreshToken` are set

### [​](https://docs.openclaw.ai/channels/twitch\#token-refresh-not-working)  Token refresh not working

**Check logs for refresh events:**

Copy

```
Using env token source for mybot
Access token refreshed for user 123456 (expires in 14400s)
```

If you see “token refresh disabled (no refresh token)”:

- Ensure `clientSecret` is provided
- Ensure `refreshToken` is provided

## [​](https://docs.openclaw.ai/channels/twitch\#config)  Config

**Account config:**

- `username` \- Bot username
- `accessToken` \- OAuth access token with `chat:read` and `chat:write`
- `clientId` \- Twitch Client ID (from Token Generator or your app)
- `channel` \- Channel to join (required)
- `enabled` \- Enable this account (default: `true`)
- `clientSecret` \- Optional: For automatic token refresh
- `refreshToken` \- Optional: For automatic token refresh
- `expiresIn` \- Token expiry in seconds
- `obtainmentTimestamp` \- Token obtained timestamp
- `allowFrom` \- User ID allowlist
- `allowedRoles` \- Role-based access control (`"moderator" | "owner" | "vip" | "subscriber" | "all"`)
- `requireMention` \- Require @mention (default: `true`)

**Provider options:**

- `channels.twitch.enabled` \- Enable/disable channel startup
- `channels.twitch.username` \- Bot username (simplified single-account config)
- `channels.twitch.accessToken` \- OAuth access token (simplified single-account config)
- `channels.twitch.clientId` \- Twitch Client ID (simplified single-account config)
- `channels.twitch.channel` \- Channel to join (simplified single-account config)
- `channels.twitch.accounts.<accountName>` \- Multi-account config (all account fields above)

Full example:

Copy

```
{
  channels: {
    twitch: {
      enabled: true,
      username: "openclaw",
      accessToken: "oauth:abc123...",
      clientId: "xyz789...",
      channel: "vevisk",
      clientSecret: "secret123...",
      refreshToken: "refresh456...",
      allowFrom: ["123456789"],
      allowedRoles: ["moderator", "vip"],
      accounts: {
        default: {
          username: "mybot",
          accessToken: "oauth:abc123...",
          clientId: "xyz789...",
          channel: "your_channel",
          enabled: true,
          clientSecret: "secret123...",
          refreshToken: "refresh456...",
          expiresIn: 14400,
          obtainmentTimestamp: 1706092800000,
          allowFrom: ["123456789", "987654321"],
          allowedRoles: ["moderator"]
        }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/twitch\#tool-actions)  Tool actions

The agent can call `twitch` with action:

- `send` \- Send a message to a channel

Example:

Copy

```
{
  "action": "twitch",
  "params": {
    "message": "Hello Twitch!",
    "to": "#mychannel"
  }
}
```

## [​](https://docs.openclaw.ai/channels/twitch\#safety-&-ops)  Safety & ops

- **Treat tokens like passwords** \- Never commit tokens to git
- **Use automatic token refresh** for long-running bots
- **Use user ID allowlists** instead of usernames for access control
- **Monitor logs** for token refresh events and connection status
- **Scope tokens minimally** \- Only request `chat:read` and `chat:write`
- **If stuck**: Restart the gateway after confirming no other process owns the session

## [​](https://docs.openclaw.ai/channels/twitch\#limits)  Limits

- **500 characters** per message (auto-chunked at word boundaries)
- Markdown is stripped before chunking
- No rate limiting (uses Twitch’s built-in rate limits)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.