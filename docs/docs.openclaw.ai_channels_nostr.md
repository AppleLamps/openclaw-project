---
url: "https://docs.openclaw.ai/channels/nostr"
title: "Nostr - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/channels/nostr#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Nostr](https://docs.openclaw.ai/channels/nostr#nostr)
- [Install (on demand)](https://docs.openclaw.ai/channels/nostr#install-on-demand)
- [Onboarding (recommended)](https://docs.openclaw.ai/channels/nostr#onboarding-recommended)
- [Manual install](https://docs.openclaw.ai/channels/nostr#manual-install)
- [Quick setup](https://docs.openclaw.ai/channels/nostr#quick-setup)
- [Configuration reference](https://docs.openclaw.ai/channels/nostr#configuration-reference)
- [Profile metadata](https://docs.openclaw.ai/channels/nostr#profile-metadata)
- [Access control](https://docs.openclaw.ai/channels/nostr#access-control)
- [DM policies](https://docs.openclaw.ai/channels/nostr#dm-policies)
- [Allowlist example](https://docs.openclaw.ai/channels/nostr#allowlist-example)
- [Key formats](https://docs.openclaw.ai/channels/nostr#key-formats)
- [Relays](https://docs.openclaw.ai/channels/nostr#relays)
- [Protocol support](https://docs.openclaw.ai/channels/nostr#protocol-support)
- [Testing](https://docs.openclaw.ai/channels/nostr#testing)
- [Local relay](https://docs.openclaw.ai/channels/nostr#local-relay)
- [Manual test](https://docs.openclaw.ai/channels/nostr#manual-test)
- [Troubleshooting](https://docs.openclaw.ai/channels/nostr#troubleshooting)
- [Not receiving messages](https://docs.openclaw.ai/channels/nostr#not-receiving-messages)
- [Not sending responses](https://docs.openclaw.ai/channels/nostr#not-sending-responses)
- [Duplicate responses](https://docs.openclaw.ai/channels/nostr#duplicate-responses)
- [Security](https://docs.openclaw.ai/channels/nostr#security)
- [Limitations (MVP)](https://docs.openclaw.ai/channels/nostr#limitations-mvp)

# [​](https://docs.openclaw.ai/channels/nostr\#nostr)  Nostr

**Status:** Optional plugin (disabled by default).Nostr is a decentralized protocol for social networking. This channel enables OpenClaw to receive and respond to encrypted direct messages (DMs) via NIP-04.

## [​](https://docs.openclaw.ai/channels/nostr\#install-on-demand)  Install (on demand)

### [​](https://docs.openclaw.ai/channels/nostr\#onboarding-recommended)  Onboarding (recommended)

- The onboarding wizard (`openclaw onboard`) and `openclaw channels add` list optional channel plugins.
- Selecting Nostr prompts you to install the plugin on demand.

Install defaults:

- **Dev channel + git checkout available:** uses the local plugin path.
- **Stable/Beta:** downloads from npm.

You can always override the choice in the prompt.

### [​](https://docs.openclaw.ai/channels/nostr\#manual-install)  Manual install

Copy

```
openclaw plugins install @openclaw/nostr
```

Use a local checkout (dev workflows):

Copy

```
openclaw plugins install --link <path-to-openclaw>/extensions/nostr
```

Restart the Gateway after installing or enabling plugins.

## [​](https://docs.openclaw.ai/channels/nostr\#quick-setup)  Quick setup

1. Generate a Nostr keypair (if needed):

Copy

```
# Using nak
nak key generate
```

2. Add to config:

Copy

```
{
  "channels": {
    "nostr": {
      "privateKey": "${NOSTR_PRIVATE_KEY}"
    }
  }
}
```

3. Export the key:

Copy

```
export NOSTR_PRIVATE_KEY="nsec1..."
```

4. Restart the Gateway.

## [​](https://docs.openclaw.ai/channels/nostr\#configuration-reference)  Configuration reference

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `privateKey` | string | required | Private key in `nsec` or hex format |
| `relays` | string\[\] | `['wss://relay.damus.io', 'wss://nos.lol']` | Relay URLs (WebSocket) |
| `dmPolicy` | string | `pairing` | DM access policy |
| `allowFrom` | string\[\] | `[]` | Allowed sender pubkeys |
| `enabled` | boolean | `true` | Enable/disable channel |
| `name` | string | - | Display name |
| `profile` | object | - | NIP-01 profile metadata |

## [​](https://docs.openclaw.ai/channels/nostr\#profile-metadata)  Profile metadata

Profile data is published as a NIP-01 `kind:0` event. You can manage it from the Control UI (Channels -> Nostr -> Profile) or set it directly in config.Example:

Copy

```
{
  "channels": {
    "nostr": {
      "privateKey": "${NOSTR_PRIVATE_KEY}",
      "profile": {
        "name": "openclaw",
        "displayName": "OpenClaw",
        "about": "Personal assistant DM bot",
        "picture": "https://example.com/avatar.png",
        "banner": "https://example.com/banner.png",
        "website": "https://example.com",
        "nip05": "openclaw@example.com",
        "lud16": "openclaw@example.com"
      }
    }
  }
}
```

Notes:

- Profile URLs must use `https://`.
- Importing from relays merges fields and preserves local overrides.

## [​](https://docs.openclaw.ai/channels/nostr\#access-control)  Access control

### [​](https://docs.openclaw.ai/channels/nostr\#dm-policies)  DM policies

- **pairing** (default): unknown senders get a pairing code.
- **allowlist**: only pubkeys in `allowFrom` can DM.
- **open**: public inbound DMs (requires `allowFrom: ["*"]`).
- **disabled**: ignore inbound DMs.

### [​](https://docs.openclaw.ai/channels/nostr\#allowlist-example)  Allowlist example

Copy

```
{
  "channels": {
    "nostr": {
      "privateKey": "${NOSTR_PRIVATE_KEY}",
      "dmPolicy": "allowlist",
      "allowFrom": ["npub1abc...", "npub1xyz..."]
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/nostr\#key-formats)  Key formats

Accepted formats:

- **Private key:**`nsec...` or 64-char hex
- **Pubkeys (`allowFrom`):**`npub...` or hex

## [​](https://docs.openclaw.ai/channels/nostr\#relays)  Relays

Defaults: `relay.damus.io` and `nos.lol`.

Copy

```
{
  "channels": {
    "nostr": {
      "privateKey": "${NOSTR_PRIVATE_KEY}",
      "relays": [\
        "wss://relay.damus.io",\
        "wss://relay.primal.net",\
        "wss://nostr.wine"\
      ]
    }
  }
}
```

Tips:

- Use 2-3 relays for redundancy.
- Avoid too many relays (latency, duplication).
- Paid relays can improve reliability.
- Local relays are fine for testing (`ws://localhost:7777`).

## [​](https://docs.openclaw.ai/channels/nostr\#protocol-support)  Protocol support

| NIP | Status | Description |
| --- | --- | --- |
| NIP-01 | Supported | Basic event format + profile metadata |
| NIP-04 | Supported | Encrypted DMs (`kind:4`) |
| NIP-17 | Planned | Gift-wrapped DMs |
| NIP-44 | Planned | Versioned encryption |

## [​](https://docs.openclaw.ai/channels/nostr\#testing)  Testing

### [​](https://docs.openclaw.ai/channels/nostr\#local-relay)  Local relay

Copy

```
# Start strfry
docker run -p 7777:7777 ghcr.io/hoytech/strfry
```

Copy

```
{
  "channels": {
    "nostr": {
      "privateKey": "${NOSTR_PRIVATE_KEY}",
      "relays": ["ws://localhost:7777"]
    }
  }
}
```

### [​](https://docs.openclaw.ai/channels/nostr\#manual-test)  Manual test

1. Note the bot pubkey (npub) from logs.
2. Open a Nostr client (Damus, Amethyst, etc.).
3. DM the bot pubkey.
4. Verify the response.

## [​](https://docs.openclaw.ai/channels/nostr\#troubleshooting)  Troubleshooting

### [​](https://docs.openclaw.ai/channels/nostr\#not-receiving-messages)  Not receiving messages

- Verify the private key is valid.
- Ensure relay URLs are reachable and use `wss://` (or `ws://` for local).
- Confirm `enabled` is not `false`.
- Check Gateway logs for relay connection errors.

### [​](https://docs.openclaw.ai/channels/nostr\#not-sending-responses)  Not sending responses

- Check relay accepts writes.
- Verify outbound connectivity.
- Watch for relay rate limits.

### [​](https://docs.openclaw.ai/channels/nostr\#duplicate-responses)  Duplicate responses

- Expected when using multiple relays.
- Messages are deduplicated by event ID; only the first delivery triggers a response.

## [​](https://docs.openclaw.ai/channels/nostr\#security)  Security

- Never commit private keys.
- Use environment variables for keys.
- Consider `allowlist` for production bots.

## [​](https://docs.openclaw.ai/channels/nostr\#limitations-mvp)  Limitations (MVP)

- Direct messages only (no group chats).
- No media attachments.
- NIP-04 only (NIP-17 gift-wrap planned).

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.