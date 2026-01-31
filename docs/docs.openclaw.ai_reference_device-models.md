---
url: "https://docs.openclaw.ai/reference/device-models"
title: "Device models - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/reference/device-models#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Device model database (friendly names)](https://docs.openclaw.ai/reference/device-models#device-model-database-friendly-names)
- [Data source](https://docs.openclaw.ai/reference/device-models#data-source)
- [Updating the database](https://docs.openclaw.ai/reference/device-models#updating-the-database)

# [​](https://docs.openclaw.ai/reference/device-models\#device-model-database-friendly-names)  Device model database (friendly names)

The macOS companion app shows friendly Apple device model names in the **Instances** UI by mapping Apple model identifiers (e.g. `iPad16,6`, `Mac16,6`) to human-readable names.The mapping is vendored as JSON under:

- `apps/macos/Sources/OpenClaw/Resources/DeviceModels/`

## [​](https://docs.openclaw.ai/reference/device-models\#data-source)  Data source

We currently vendor the mapping from the MIT-licensed repository:

- `kyle-seongwoo-jun/apple-device-identifiers`

To keep builds deterministic, the JSON files are pinned to specific upstream commits (recorded in `apps/macos/Sources/OpenClaw/Resources/DeviceModels/NOTICE.md`).

## [​](https://docs.openclaw.ai/reference/device-models\#updating-the-database)  Updating the database

1. Pick the upstream commits you want to pin to (one for iOS, one for macOS).
2. Update the commit hashes in `apps/macos/Sources/OpenClaw/Resources/DeviceModels/NOTICE.md`.
3. Re-download the JSON files, pinned to those commits:

Copy

```
IOS_COMMIT="<commit sha for ios-device-identifiers.json>"
MAC_COMMIT="<commit sha for mac-device-identifiers.json>"

curl -fsSL "https://raw.githubusercontent.com/kyle-seongwoo-jun/apple-device-identifiers/${IOS_COMMIT}/ios-device-identifiers.json" \
  -o apps/macos/Sources/OpenClaw/Resources/DeviceModels/ios-device-identifiers.json

curl -fsSL "https://raw.githubusercontent.com/kyle-seongwoo-jun/apple-device-identifiers/${MAC_COMMIT}/mac-device-identifiers.json" \
  -o apps/macos/Sources/OpenClaw/Resources/DeviceModels/mac-device-identifiers.json
```

4. Ensure `apps/macos/Sources/OpenClaw/Resources/DeviceModels/LICENSE.apple-device-identifiers.txt` still matches upstream (replace it if the upstream license changes).
5. Verify the macOS app builds cleanly (no warnings):

Copy

```
swift build --package-path apps/macos
```

[Rpc](https://docs.openclaw.ai/reference/rpc) [Test](https://docs.openclaw.ai/reference/test)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.