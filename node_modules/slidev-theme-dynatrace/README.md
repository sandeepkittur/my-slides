# slidev-theme-dynatrace

Dynatrace Corporate 2026 theme for [Slidev](https://sli.dev).

## Installation

Add the theme as a dependency in your `package.json`, pinned to a specific release tag:

```json
{
  "dependencies": {
    "slidev-theme-dynatrace": "github:Dynatrace-Internal/slidev-theme-dynatrace#v1.0.0"
  }
}
```

Then run `npm install`. To use the latest release, replace `v1.0.0` with the tag from the [Releases page](../../releases).

## Usage

In your `slides.md` frontmatter:

```yaml
---
theme: dynatrace
---
```

## Layouts

| Layout | Description |
|---|---|
| `cover` | Full-bleed dark title slide with background image |
| `default` | Standard content slide (light/dark aware) |
| `section` | Dark section divider with decorative number |
| `statement` | Large centered statement or quote |
| `two-cols` | Two-column layout with header slot |
| `closing` | Thank-you / closing slide |
| `animated-background` | Slide with Dynatrace animated gradient background |

## Example

```md
---
layout: cover
---

# Presentation Title
## Subtitle text here

---
layout: default
---

# Slide Heading

- Bullet one
- Bullet two

---
layout: section
sectionNumber: 01
---

# Section Title

---
layout: two-cols
---

::header::
# Two Column Slide

::left::
Left column content

::right::
Right column content

---
layout: statement
---

**Observability** is the foundation of modern operations.

---
layout: closing
---

# Thank You

::contact::
dynatrace.com

---
layout: animated-background
---

# Live on Dynatrace Cloud
## Powered by AI and OpenTelemetry
```

### Animated background on any slide

Use `<DTAnimatedBackground />` as a standalone component inside any custom layout or slide to get the animated gradient background without the full `animated-background` layout:

```md
---
layout: default
---

<DTAnimatedBackground />

# My Slide
Content appears on top of the animation.
```

> **Note:** The animation requires WebGL. The `animated-background` layout falls back to plain navy (`--dt-navy`) if unavailable; when using the component standalone, set an appropriate background color on the slide/layout.

## Styling slides

### UnoCSS utility classes

Slidev ships with [UnoCSS](https://unocss.dev) built in. You can use utility classes directly on any HTML element inside a slide:

```md
<div class="text-2xl mt-6 leading-loose">

Your content here.

</div>
```

Common utilities: `text-xl` / `text-2xl` / `text-3xl` for size, `mt-*` / `mb-*` / `space-y-*` for spacing, `opacity-60` for muting, `font-bold` for weight.

### Scoped `<style>` blocks

For per-slide CSS that shouldn't affect the rest of the deck, add a `<style>` block at the bottom of any slide. Slidev automatically scopes it to that slide only:

```md
---

## Setup Check

1. **Is Node installed?**

   Run `node --version` to confirm.

2. **Is Claude Code installed?**

   Run `claude --version` to confirm.

<style>
ol { font-size: 1.3em; margin-top: 1.5rem; }
ol li + li { margin-top: 1rem; }
ol li p:last-child { opacity: 0.6; font-size: 0.82em; margin-top: 0.15em; }
</style>
```

Use `<style>` blocks for one-off tweaks. If a pattern appears on multiple slides, add a utility class to `styles/index.css` instead so it stays in one place.

## Components

- `<DTLogo variant="white|color|auto" :width="140" />` — Dynatrace logo
- `<DTFooter text="Optional text" :dark="false" />` — slide footer with gradient bar
- `<DTAnimatedBackground />` — Dynatrace branded WebGL animated gradient (teal → blue → purple waves)

## Releasing a new version

Releases are fully automated via GitHub Actions. The theme is distributed as git tags — it is not published to npm.

### Steps

1. **Merge all changes to `main`.**

2. **Push a semver tag:**

   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

3. **The GitHub Action runs automatically and:**
   - Bumps `package.json` to the tagged version and commits it back to `main`
   - Creates a **draft** GitHub Release with auto-generated release notes grouped by PR label (Breaking Changes, New Features, Bug Fixes, etc.)

4. **Review and publish the draft:**
   - Go to the repo → **Releases** → click the draft
   - Edit the notes if needed
   - Click **Publish release**

### Prerequisites

The action uses the built-in **`GITHUB_TOKEN`** — no extra secrets needed. The only requirement is that `main` must not have branch protection rules that require PRs (i.e. direct pushes must be allowed). If `main` is protected, you will need to either exempt the GitHub Actions bot from the protection rule or use a PAT stored as a `RELEASE_TOKEN` secret instead.

### PR labels for release notes

Label your PRs to get well-structured release notes:

| Label | Section |
|---|---|
| `breaking` | Breaking Changes |
| `enhancement`, `feature` | New Features |
| `bug`, `fix` | Bug Fixes |
| `styling`, `design` | Styling & Brand |
| `documentation` | Documentation |
| `chore`, `dependencies`, `refactor` | Maintenance |
| `skip-changelog` | Excluded from notes |

## Contributing

### Running the theme locally

```bash
# Install dependencies
npm install

# Start the dev server with the demo slide deck
npm run dev
```

This runs `slides.md` at the repo root, which references the theme via `theme: ./` so changes to layouts, components, and styles hot-reload instantly without needing to publish the package.
