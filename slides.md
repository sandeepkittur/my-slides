---
theme: ./theme
title: October UX Updates
---

# October UX Updates
Monthly product highlights · October 2026

---


# OpP App Maintenance: Post-GA Improvements

- Topic: Surface the object `version` in the pipeline details JSON
- As a user, I want to see the object version in the pipeline details JSON so the current state of the pipeline is fully represented
- The OpenPipeline App now talks to the Settings API via the new SDK, which requires an object version on every update for optimistic locking
- This version field isn't currently surfaced in the pipeline details JSON view, so the JSON representation is incomplete

---

# OpP App Maintenance: Post-GA Improvements (cont.)

- The `version` field now needed for optimistic locking is missing from the JSON view
- Adding it keeps the pipeline details JSON complete and in sync with what the Settings API actually tracks

<img src="/pipeline-version-field.png" class="rounded" />

---

# Locked vs. Editable Fields

- Idea: show a locked state in the JSON view to make the distinction clear
- Clear visual separation between editable and non-editable (system-managed) fields
- Reduces confusion when `version`, `schemaId`, `objectId` and similar fields appear read-only

<img src="/pipeline-locked-fields.png" class="rounded" />

- Strato idea ticket raised: [PPFB-831](https://dt-rnd.atlassian.net/browse/PPFB-831)

---

# Introducing New EmptyStates

- Log ingest configuration isn't available yet
- This feature requires Logs powered by Grail
- This feature isn't available for your environment
- &lt;This feature&gt; isn't available yet

<div class="grid grid-cols-2 gap-4">
  <img src="/empty-state-log-ingest.png" class="rounded" />
  <img src="/empty-state-feature-requires-grail.png" class="rounded" />
  <img src="/empty-state-not-available-environment.png" class="rounded" />
  <img src="/empty-state-feature-rolling-out.png" class="rounded" />
</div>

---

# Introducing New EmptyStates (cont.)

- Span export isn't turned on
- Your subscription doesn't include &lt;this feature&gt;
- Smartscape lifecycle events are not enabled

<div class="grid grid-cols-2 gap-4">
  <img src="/empty-state-span-export.png" class="rounded" />
  <img src="/empty-state-subscription-upgrade.png" class="rounded" />
  <img src="/empty-state-smartscape-lifecycle.png" class="rounded" />
</div>

---

# E2E: Pipeline Preview

- Two cases: pipeline-focused preview (preview all processors of the pipeline), and preview of ingest preprocessing + pipeline processors
- Status: design iterations in progress — tested with a couple of internal experts, refining the use case

<img src="/e2e-pipeline-preview-overview.png" class="rounded" />

---

# E2E: Pipeline Preview — Flow

- Pick a scope
- Start with sample data
- Auto-run preview to start seeing processor output

<div class="grid grid-cols-3 gap-4">
  <img src="/e2e-preview-scope.png" class="rounded" />
  <img src="/e2e-preview-sample-data.png" class="rounded" />
  <img src="/e2e-preview-autorun.png" class="rounded" />
</div>

---

# Focus on MDP

- Reducing clutter to minimalise the offering
- Scale the preview experience as we go

<div class="grid grid-cols-3 gap-4">
  <img src="/e2e-preview-mdp-select.png" class="rounded" />
  <img src="/e2e-preview-mdp-in.png" class="rounded" />
  <img src="/e2e-preview-mdp-out.png" class="rounded" />
</div>

---

# Starting the Conversation Around Hidden Stages

- System stages (Limiting, Maintenance window, Sanitization) act on records but are hidden from the visible pipeline stages
- Example: Size limits trimmed an oversized record from 582 KB to 512 KB and stamped a warning flag instead of dropping it — but this wasn't visible without digging in
- Exploring how to surface these system-stage effects so users aren't surprised by them

<img src="/hidden-stages-size-limits.png" class="rounded" />

---

# Fleet Management & BindPlane Integration

- Met with Vicky to discuss the user flow
- Not yet prioritised by the Fleet management team — waiting to be picked up

<img src="/fleet-bindplane-egress.png" class="rounded" />

---


# Thank You

Questions? Let's discuss.
