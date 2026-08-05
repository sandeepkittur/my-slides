---
theme: ./
title: Dynatrace Theme Showcase
highlighter: shiki
lineNumbers: true
transition: fade
---

# Dynatrace Theme Showcase
## slidev-theme-dynatrace

---
layout: default
title: Installation
confidential: false
---

# Installation

**1. Install Slidev**

```bash
npm install -g @slidev/cli
```

**2. Install this theme**

```bash
npm install github:Dynatrace-Internal/slidev-theme-dynatrace
```

**3. Add to your `slides.md` frontmatter**

```yaml
---
theme: dynatrace
---
```

---
layout: section
sectionNumber: "01"
---

# Layouts

---
layout: default
title: Default Layout
---

# Default Layout

This is the standard content slide. The heading gets a gradient underline automatically.

- Bullet points use the brand blue `--dt-accent1`
- **Bold text** and _italic text_ work as expected
- Nested lists are supported
  - Second level
  - Another item

> Blockquotes are styled with a left accent border.

The footer shows **Confidential** by default. Suppress it with `confidential: false` in frontmatter.

---
layout: default
title: Code Highlighting
---

# Code Highlighting

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const message = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Explain observability in one sentence.' }
  ],
})

console.log(message.content[0].text)
```

---
layout: two-cols
---

::header::
# Two-Column Layout

::left::

### Left Column

Use `::left::` and `::right::` slot markers to fill each side.

- Feature comparison tables
- Before / after code
- Steps alongside a diagram

::right::

```yaml
---
layout: two-cols
---

::header::
# Slide Title

::left::
Left content here

::right::
Right content here
```

---
layout: statement
---

**Observability** is not optional —  
it is the foundation of every resilient system.

---
layout: section
sectionNumber: "02"
---

# Components

---
layout: default
title: DTBadge
---

# DTBadge

Use `<DTBadge>` to highlight status, categories, or labels inline.

```html
<DTBadge color="blue">Production</DTBadge>
<DTBadge color="teal">Stable</DTBadge>
<DTBadge color="purple">Beta</DTBadge>
```

<div class="flex flex-wrap gap-3 mt-6">
  <DTBadge color="blue">Production</DTBadge>
  <DTBadge color="teal">Stable</DTBadge>
  <DTBadge color="purple">Beta</DTBadge>
  <DTBadge color="green">Passing</DTBadge>
  <DTBadge color="red">Critical</DTBadge>
  <DTBadge color="gray">Deprecated</DTBadge>
</div>

---
layout: default
title: DTCallout
---

# DTCallout

Four semantic variants: `info`, `success`, `warning`, `error`.

```html
<DTCallout type="info">General guidance or tips.</DTCallout>
<DTCallout type="success">Deployment completed successfully.</DTCallout>
<DTCallout type="warning">This API is deprecated in v3.</DTCallout>
<DTCallout type="error">SLO breach — p99 latency exceeds 2 000 ms.</DTCallout>
```

<DTCallout type="info">General guidance or tips.</DTCallout>
<DTCallout type="success">Deployment completed successfully.</DTCallout>
<DTCallout type="warning">This API is deprecated in v3.</DTCallout>
<DTCallout type="error">SLO breach — p99 latency exceeds 2 000 ms.</DTCallout>

---
layout: default
title: DTCard
---

# DTCard

Cards group related content with a subtle border and spacing.

```html
<DTCard>
  <h3>Ingestion</h3>
  <p>42 B events/day across 6 regions.</p>
</DTCard>
```

<div class="grid grid-cols-3 gap-4 mt-4">
  <DTCard>
    <h3>Ingestion</h3>
    <p>42 B events/day processed across 6 regions.</p>
  </DTCard>
  <DTCard>
    <h3>Alerting</h3>
    <p>Davis AI resolved 94 % of anomalies automatically.</p>
  </DTCard>
  <DTCard>
    <h3>Cost</h3>
    <p>DDU consumption down 18 % after log optimisation.</p>
  </DTCard>
</div>

---
layout: default
title: DTStats
---

# DTStats

Display key metrics with optional trend indicators and accent colours.

```html
<DTStats value="99.98%" label="Uptime SLO" trend="↑ 0.2%" accent="teal" />
<DTStats value="42B" label="Events / day" trend="↑ 18%" accent="blue" />
<DTStats value="< 2 ms" label="Median latency" trend="↓ 12%" accent="purple" />
<DTStats value="1 400+" label="Integrations" accent="cyan" />
```

<div class="grid grid-cols-4 gap-6 mt-4">
  <DTStats value="99.98%" label="Uptime SLO" trend="↑ 0.2%" accent="teal" />
  <DTStats value="42B" label="Events / day" trend="↑ 18%" accent="blue" />
  <DTStats value="< 2 ms" label="Median latency" trend="↓ 12%" accent="purple" />
  <DTStats value="1 400+" label="Integrations" accent="cyan" />
</div>

---
layout: default
title: DTLogo
---

# DTLogo

Three variants: `white` (for dark backgrounds), `color` (for light backgrounds), `auto` (switches by context).

```html
<DTLogo variant="white" :width="200" />
<DTLogo variant="color" :width="200" />
```

<div class="flex flex-col gap-6 mt-6">
  <div class="p-6 rounded-lg bg-[var(--dt-navy)] flex items-center">
    <DTLogo variant="white" :width="200" />
  </div>
  <div class="p-6 rounded-lg bg-white border border-gray-200 flex items-center">
    <DTLogo variant="color" :width="200" />
  </div>
</div>

---
layout: default
title: DTFooter
---

# DTFooter

`DTFooter` is rendered automatically in the `default` and `two-cols` layouts. You don't need to add it manually.

- **Confidential label** — shown by default, suppress with `confidential: false`
- **Custom text** — pass via the `text` prop if needed

```html
<!-- Only needed if you build a custom layout -->
<DTFooter text="Internal Use Only" />
```

---
layout: section
sectionNumber: "03"
---

# Charts

---
layout: two-cols
title: DTBarChart
---

::header::
# DTBarChart

::left::

```html
<DTBarChart
  title="Monthly Deployments"
  :data="[
    { label: 'Jan', value: 42 },
    { label: 'Feb', value: 58 },
    { label: 'Mar', value: 37 },
    { label: 'Apr', value: 71 },
    { label: 'May', value: 64 },
    { label: 'Jun', value: 89 },
  ]"
/>
```

::right::

<DTBarChart
  title="Monthly Deployments"
  :data="[
    { label: 'Jan', value: 42 }, { label: 'Feb', value: 58 },
    { label: 'Mar', value: 37 }, { label: 'Apr', value: 71 },
    { label: 'May', value: 64 }, { label: 'Jun', value: 89 },
  ]"
/>

---
layout: two-cols
title: DTLineChart
---

::header::
# DTLineChart

::left::

```html
<DTLineChart
  title="Latency Trends"
  :data="[
    { label: 'Q1', values: [12, 180] },
    { label: 'Q2', values: [10, 145] },
    { label: 'Q3', values: [11, 160] },
    { label: 'Q4', values: [9, 120] },
  ]"
  :series="['P50 (ms)', 'P99 (ms)']"
/>
```

::right::

<DTLineChart
  title="Latency Trends"
  :data="[
    { label: 'Q1', values: [12, 180] }, { label: 'Q2', values: [10, 145] },
    { label: 'Q3', values: [11, 160] }, { label: 'Q4', values: [9, 120] },
  ]"
  :series="['P50 (ms)', 'P99 (ms)']"
/>

---
layout: two-cols
title: DTDoughnutChart
---

::header::
# DTDoughnutChart

::left::

```html
<DTDoughnutChart
  title="DDU Breakdown"
  :data="[
    { label: 'Infra', value: 35 },
    { label: 'APM', value: 25 },
    { label: 'Logs', value: 20 },
    { label: 'RUM', value: 12 },
    { label: 'Synthetics', value: 8 },
  ]"
  centerValue="100B"
  centerLabel="DDUs"
/>
```

::right::

<DTDoughnutChart
  title="DDU Breakdown"
  :data="[
    { label: 'Infra', value: 35 }, { label: 'APM', value: 25 },
    { label: 'Logs', value: 20 }, { label: 'RUM', value: 12 },
    { label: 'Synthetics', value: 8 },
  ]"
  centerValue="100B" centerLabel="DDUs"
/>

---
layout: section
sectionNumber: "04"
---

# Animated Background

---
layout: two-cols
title: animated-background usage
---

::header::
# Animated Background

::left::

**Option 1 — dedicated layout**

```yaml
---
layout: animated-background
---

# Your slide content here
```

::right::

**Option 2 — component on any layout**

```html
---
layout: default
---

<DTAnimatedBackground />

# Your slide content here
```

> Falls back to `--dt-navy` when WebGL is unavailable.

---
layout: animated-background
---

# animated-background Layout

The full-slide WebGL gradient fills the background automatically. Content stays on top — just write your slide as normal.

---
layout: section
sectionNumber: "05"
---

# Brand Tokens

---
layout: default
title: Color Palette
---

# Color Palette

<div class="grid grid-cols-4 gap-3 mt-6 text-sm">
  <div class="rounded-lg p-4 text-white font-mono" style="background: #00092F">#00092F<br><span class="opacity-60">--dt-navy</span></div>
  <div class="rounded-lg p-4 text-white font-mono" style="background: #1866FE">#1866FE<br><span class="opacity-60">--dt-accent1</span></div>
  <div class="rounded-lg p-4 text-white font-mono" style="background: #7F1AFE">#7F1AFE<br><span class="opacity-60">--dt-accent2</span></div>
  <div class="rounded-lg p-4 text-white font-mono" style="background: #01D393">#01D393<br><span class="opacity-60">--dt-accent3</span></div>
  <div class="rounded-lg p-4 text-[#00092F] font-mono" style="background: #85ADFF">#85ADFF<br><span class="opacity-60">--dt-accent4</span></div>
  <div class="rounded-lg p-4 text-[#00092F] font-mono" style="background: #C499FE">#C499FE<br><span class="opacity-60">--dt-accent5</span></div>
  <div class="rounded-lg p-4 text-[#00092F] font-mono" style="background: #5CFDCC">#5CFDCC<br><span class="opacity-60">--dt-accent6</span></div>
  <div class="rounded-lg p-4 text-white font-mono" style="background: linear-gradient(90deg, #01D393, #1866FE, #7F1AFE)">gradient<br><span class="opacity-60">--dt-gradient</span></div>
</div>

---
layout: closing
---

# Thank You

Built with ❤️ at Dynatrace

::contact::
Created by [Indermohan Singh](https://dynatrace.enterprise.slack.com/team/U02P6MZ7W07) · github.com/Dynatrace-Internal/slidev-theme-dynatrace
