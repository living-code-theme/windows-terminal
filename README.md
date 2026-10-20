<!-- living-code-readme:1 -->
# 🪟 Living Code for Windows Terminal

**Calm slate. Living color.** Living Code for Windows Terminal. Repository-owned theme files, installation instructions and four color flavors.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

Real application screenshots have not been captured yet.

## Installation

Run this in PowerShell. It saves a [JSON fragment](https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions) that Windows Terminal loads by itself, so nothing in `settings.json` is edited:

```powershell
$d = "$env:LOCALAPPDATA\Microsoft\Windows Terminal\Fragments\living-code"; New-Item -ItemType Directory -Force $d | Out-Null; Invoke-WebRequest https://raw.githubusercontent.com/living-code-theme/windows-terminal/main/living-code.json -OutFile "$d\living-code.json" -UseBasicParsing
```

Restart Windows Terminal. The four schemes appear in *Settings → Color schemes*; select one under a profile's *Appearance*, or set it in `settings.json`:

```json
"colorScheme": "Living Code Night"
```

Fallback: paste the scheme objects from `living-code-*.json` into the `schemes` array of `settings.json`.

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

A real application capture is not available yet.

Select **Living Code Night** in your profile's Appearance settings, or set:

```json
"colorScheme": "Living Code Night"
```

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

A real application capture is not available yet.

Select **Living Code Frost** in your profile's Appearance settings, or set:

```json
"colorScheme": "Living Code Frost"
```

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

A real application capture is not available yet.

Select **Living Code Paper** in your profile's Appearance settings, or set:

```json
"colorScheme": "Living Code Paper"
```

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

A real application capture is not available yet.

Select **Living Code Signal** in your profile's Appearance settings, or set:

```json
"colorScheme": "Living Code Signal"
```

</details>

## Configuration

See [Windows Terminal's documentation](https://github.com/microsoft/terminal) for application settings and reload behavior. The activation instructions above identify each supported flavor; keep your other application configuration.

## Compatibility

This port supplies theme files for Windows Terminal, not the application itself. Install the application separately and follow the installation instructions for its supported configuration format.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/windows-terminal/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
