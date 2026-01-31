---
url: "https://docs.openclaw.ai/providers/claude-max-api-proxy"
title: "Claude max api proxy - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/claude-max-api-proxy#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Claude Max API Proxy](https://docs.openclaw.ai/providers/claude-max-api-proxy#claude-max-api-proxy)
- [Why Use This?](https://docs.openclaw.ai/providers/claude-max-api-proxy#why-use-this)
- [How It Works](https://docs.openclaw.ai/providers/claude-max-api-proxy#how-it-works)
- [Installation](https://docs.openclaw.ai/providers/claude-max-api-proxy#installation)
- [Usage](https://docs.openclaw.ai/providers/claude-max-api-proxy#usage)
- [Start the server](https://docs.openclaw.ai/providers/claude-max-api-proxy#start-the-server)
- [Test it](https://docs.openclaw.ai/providers/claude-max-api-proxy#test-it)
- [With OpenClaw](https://docs.openclaw.ai/providers/claude-max-api-proxy#with-openclaw)
- [Available Models](https://docs.openclaw.ai/providers/claude-max-api-proxy#available-models)
- [Auto-Start on macOS](https://docs.openclaw.ai/providers/claude-max-api-proxy#auto-start-on-macos)
- [Links](https://docs.openclaw.ai/providers/claude-max-api-proxy#links)
- [Notes](https://docs.openclaw.ai/providers/claude-max-api-proxy#notes)
- [See Also](https://docs.openclaw.ai/providers/claude-max-api-proxy#see-also)

# [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#claude-max-api-proxy)  Claude Max API Proxy

**claude-max-api-proxy** is a community tool that exposes your Claude Max/Pro subscription as an OpenAI-compatible API endpoint. This allows you to use your subscription with any tool that supports the OpenAI API format.

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#why-use-this)  Why Use This?

| Approach | Cost | Best For |
| --- | --- | --- |
| Anthropic API | Pay per token (~15/Minput,15/M input, 15/Minput,75/M output for Opus) | Production apps, high volume |
| Claude Max subscription | $200/month flat | Personal use, development, unlimited usage |

If you have a Claude Max subscription and want to use it with OpenAI-compatible tools, this proxy can save you significant money.

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#how-it-works)  How It Works

Copy

```
Your App → claude-max-api-proxy → Claude Code CLI → Anthropic (via subscription)
     (OpenAI format)              (converts format)      (uses your login)
```

The proxy:

1. Accepts OpenAI-format requests at `http://localhost:3456/v1/chat/completions`
2. Converts them to Claude Code CLI commands
3. Returns responses in OpenAI format (streaming supported)

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#installation)  Installation

Copy

```
# Requires Node.js 20+ and Claude Code CLI
npm install -g claude-max-api-proxy

# Verify Claude CLI is authenticated
claude --version
```

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#usage)  Usage

### [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#start-the-server)  Start the server

Copy

```
claude-max-api
# Server runs at http://localhost:3456
```

### [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#test-it)  Test it

Copy

```
# Health check
curl http://localhost:3456/health

# List models
curl http://localhost:3456/v1/models

# Chat completion
curl http://localhost:3456/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-opus-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#with-openclaw)  With OpenClaw

You can point OpenClaw at the proxy as a custom OpenAI-compatible endpoint:

Copy

```
{
  env: {
    OPENAI_API_KEY: "not-needed",
    OPENAI_BASE_URL: "http://localhost:3456/v1"
  },
  agents: {
    defaults: {
      model: { primary: "openai/claude-opus-4" }
    }
  }
}
```

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#available-models)  Available Models

| Model ID | Maps To |
| --- | --- |
| `claude-opus-4` | Claude Opus 4 |
| `claude-sonnet-4` | Claude Sonnet 4 |
| `claude-haiku-4` | Claude Haiku 4 |

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#auto-start-on-macos)  Auto-Start on macOS

Create a LaunchAgent to run the proxy automatically:

Copy

```
cat > ~/Library/LaunchAgents/com.claude-max-api.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.claude-max-api</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/node</string>
    <string>/usr/local/lib/node_modules/claude-max-api-proxy/dist/server/standalone.js</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>/usr/local/bin:/opt/homebrew/bin:~/.local/bin:/usr/bin:/bin</string>
  </dict>
</dict>
</plist>
EOF

launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.claude-max-api.plist
```

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#links)  Links

- **npm:** [https://www.npmjs.com/package/claude-max-api-proxy](https://www.npmjs.com/package/claude-max-api-proxy)
- **GitHub:** [https://github.com/atalovesyou/claude-max-api-proxy](https://github.com/atalovesyou/claude-max-api-proxy)
- **Issues:** [https://github.com/atalovesyou/claude-max-api-proxy/issues](https://github.com/atalovesyou/claude-max-api-proxy/issues)

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#notes)  Notes

- This is a **community tool**, not officially supported by Anthropic or OpenClaw
- Requires an active Claude Max/Pro subscription with Claude Code CLI authenticated
- The proxy runs locally and does not send data to any third-party servers
- Streaming responses are fully supported

## [​](https://docs.openclaw.ai/providers/claude-max-api-proxy\#see-also)  See Also

- [Anthropic provider](https://docs.openclaw.ai/providers/anthropic) \- Native OpenClaw integration with Claude setup-token or API keys
- [OpenAI provider](https://docs.openclaw.ai/providers/openai) \- For OpenAI/Codex subscriptions

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.