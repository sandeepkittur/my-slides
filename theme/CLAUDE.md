# slidev-theme-dynatrace

Dynatrace Corporate 2026 theme for [Slidev](https://sli.dev). This repo **is** the theme package — not a presentation built with it.

## Project structure

```
layouts/          Vue layout components (cover, default, section, statement, two-cols, closing)
components/       Reusable DT-prefixed Vue components (DTLogo, DTFooter, DTCard, DTBadge, etc.)
styles/index.css  Global brand tokens + all layout/utility CSS
fonts/            DTFlow OTF + Roboto Mono WOFF2 (bundled, no CDN dependency)
public/           Background images and SVG logos used by layouts
setup/            Slidev addon setup (mermaid.ts configures mermaid theming)
shiki-theme.json  Custom Shiki syntax highlighting theme
package.json      Theme manifest — name must stay "slidev-theme-dynatrace"
slides.md         Local development/demo slide deck (not part of the distributed theme)
```

## Brand tokens (styles/index.css)

All colors are defined as CSS custom properties on `:root`:

| Token | Hex | Usage |
|---|---|---|
| `--dt-navy` | `#00092F` | Dark slide backgrounds, body text |
| `--dt-accent1` | `#1866FE` | Blue — primary brand, bullets, links |
| `--dt-accent2` | `#7F1AFE` | Purple/violet |
| `--dt-accent3` | `#01D393` | Teal — success, gradient start |
| `--dt-accent4` | `#85ADFF` | Light blue |
| `--dt-accent5` | `#C499FE` | Light purple |
| `--dt-accent6` | `#5CFDCC` | Cyan |
| `--dt-gradient` | teal→blue→purple | Gradient bar, footer divider |

Font: **DTFlow** (hairline/light/medium/semibold/bold) + **Roboto Mono** for code.

## Layouts

| Layout | Key prop(s) | Notes |
|---|---|---|
| `cover` | — | Dark full-bleed title slide |
| `default` | `title`, `confidential` (bool, default true) | Light slide with footer; h1 gets gradient underline |
| `section` | `sectionNumber` | Dark section divider |
| `statement` | — | Large centered quote/statement |
| `two-cols` | — | Slots: `#header`, `#left`, `#right` |
| `closing` | — | Dark thank-you slide; slot `#contact` |

## Components

| Component | Props | Notes |
|---|---|---|
| `DTLogo` | `variant` (white\|color\|auto), `width` | SVG logo |
| `DTLogoIcon` | `variant`, `size` | Icon-only version used in default footer |
| `DTFooter` | `text`, `dark` (bool) | Gradient bar + optional text |
| `DTCard` | — | Content card with border |
| `DTBadge` | `color` | Inline pill badge |
| `DTCallout` | `type` (info\|success\|warning\|error) | Callout block with left border |
| `DTStats` | — | Stat display component |
| `DTBarChart`, `DTLineChart`, `DTDoughnutChart`, `DTChart` | — | Chart wrappers |

## Development

```bash
# Install (requires Node ≥18 + pnpm or npm)
npm install

# Develop: preview slides.md with hot reload
npx slidev slides.md

# Build static HTML export
npx slidev build slides.md
```

`slides.md` at the root is the local dev/demo deck. It is **not** distributed as part of the theme — it's just for testing layouts locally.

## Adding a new layout

1. Create `layouts/my-layout.vue`
2. Use `<template>` with class `slidev-layout my-layout`
3. Reference brand tokens from `styles/index.css` via `var(--dt-*)`
4. Test in `slides.md` with `layout: my-layout` in frontmatter
5. Document in `README.md`

## Adding a new component

1. Create `components/DT<Name>.vue` — DT prefix is the convention
2. Keep scoped styles; reference `:root` tokens via `var(--dt-*)`
3. Support dark mode with `:global(.dark)` selector pattern (see `default.vue`)

## Key conventions

- **No npm publishing** — this is an internal GitHub repo. Distribution is via git tags only. Consumers install with `"slidev-theme-dynatrace": "github:Dynatrace-Internal/slidev-theme-dynatrace#v1.2.3"` in their `package.json`. Never suggest publishing to npm.
- **No CDN fonts** — all fonts are bundled in `fonts/`. Keep it offline-capable.
- **Dark layouts** (cover, section, closing) set `background-color: var(--dt-navy)` directly via `styles/index.css` — do not override per-component.
- **Light slides** use `var(--dt-white)` background with `var(--dt-navy)` text.
- The default layout footer shows "Confidential" by default; suppress with `:confidential="false"`.
- Mermaid diagram colors are configured in both `styles/index.css` (CSS overrides) and `setup/mermaid.ts` (theme config).
- Code highlighting uses the custom `shiki-theme.json` — edit it to change token colors.

## Releasing a new version

1. Merge all changes to `main`.
2. Push a semver tag: `git tag v1.2.3 && git push origin v1.2.3`
3. The GitHub Action (`.github/workflows/release.yml`) will:
   - Bump `package.json` to the tagged version and commit back to `main`
   - Create a **draft** GitHub Release with auto-generated notes
4. Edit the draft release notes in the GitHub UI, then click **Publish release**.

The action uses the built-in `GITHUB_TOKEN`. This works as long as `main` has no branch protection requiring PRs. If it does, add a PAT as a `RELEASE_TOKEN` secret and use it in the checkout step.
