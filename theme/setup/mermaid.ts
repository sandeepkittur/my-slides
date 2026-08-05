import { defineMermaidSetup } from '@slidev/types'

// Dynatrace Corporate 2026 — Mermaid theme matched to the PPT chart palette.
// Palette cycle order: accent1 → accent2 → accent3 → accent4 → accent5 → accent6
//   accent1 #1866FE  blue
//   accent2 #7F1AFE  purple
//   accent3 #01D393  teal
//   accent4 #85ADFF  light blue
//   accent5 #C499FE  light purple
//   accent6 #5CFDCC  cyan
export default defineMermaidSetup(() => {
  // CSS that gets injected INSIDE the rendered Mermaid SVG. Required because
  // Slidev renders the SVG inside a Shadow DOM, so external CSS cannot pierce
  // through. Anything visual needs to live here.
  const themeCSS = `
    /* Cap SVG to slot width AND a sensible slide-relative height.
       360px = approx slide content area minus h1 + footer for default layout.
       preserveAspectRatio="xMidYMid meet" handles proportional scaling, so
       content is just rendered smaller — never cropped. */
    svg {
      max-width: 100% !important;
      max-height: 300px !important;
      width: auto !important;
      height: auto !important;
      display: block;
      margin: 0 auto;
    }

    /* Flowchart edges — bold accent1 */
    .edgePath .path,
    .flowchart-link {
      stroke: #1866FE !important;
      stroke-width: 2.5px !important;
      fill: none !important;
    }
    marker path,
    .arrowMarkerPath {
      fill: #1866FE !important;
      stroke: #1866FE !important;
    }

    /* Flowchart nodes — subtle rounded corners */
    .node rect, .node polygon {
      rx: 3 !important;
      ry: 3 !important;
    }

    /* Cluster (subgraph) — neutral light bg, accent border, compact */
    .cluster rect {
      fill: rgba(255, 255, 255, 0.9) !important;
      stroke: #1866FE !important;
      stroke-width: 1.5px !important;
      rx: 4px;
      ry: 4px;
    }
    .cluster-label,
    .cluster-label span,
    .cluster-label .nodeLabel {
      font-weight: 700 !important;
      fill: #00092F !important;
    }

    /* Edge labels — no box, text sits directly on the line with a white halo
       so it stays readable wherever the arrow passes underneath. */
    .edgeLabel,
    .edgeLabel rect,
    .edgeLabel foreignObject,
    .edgeLabel .label rect,
    .edgeLabel .labelBkg {
      fill: transparent !important;
      background: transparent !important;
      opacity: 1 !important;
    }
    .edgeLabel text,
    .edgeLabel .label text,
    .edgeLabel span {
      fill: #00092F !important;
      color: #00092F !important;
      font-family: 'DTFlow', sans-serif;
      paint-order: stroke fill;
      stroke: #FFFFFF;
      stroke-width: 3px;
      stroke-linejoin: round;
    }

    /* Sequence diagram message arrows — bold accent1 */
    .messageLine0,
    .messageLine1 {
      stroke: #1866FE !important;
      stroke-width: 2.5px !important;
    }
    #arrowhead path {
      fill: #1866FE !important;
      stroke: #1866FE !important;
    }

    /* Sequence lifelines — bold accent2 dashed */
    line.actor-line {
      stroke: #7F1AFE !important;
      stroke-width: 2px !important;
      stroke-dasharray: 5 4 !important;
    }

    /* Sequence activations — accent3 */
    .activation0, .activation1, .activation2 {
      fill: #01D393 !important;
      stroke: #01D393 !important;
    }

    /* All text uses DTFlow */
    text, .nodeLabel, .edgeLabel, .label {
      font-family: 'DTFlow', sans-serif !important;
    }

    /* Compact node text — slides are dense, smaller text reads better */
    .node text, .node .nodeLabel,
    .node foreignObject span,
    .node foreignObject p {
      font-size: 12px !important;
      font-weight: 500 !important;
    }
    .cluster-label, .cluster-label span, .cluster-label .nodeLabel {
      font-size: 12px !important;
    }
    .edgeLabel, .edgeLabel text {
      font-size: 11px !important;
    }
    .messageText {
      font-size: 12px !important;
    }
    .actor text, .actor .nodeLabel {
      font-size: 13px !important;
      font-weight: 600 !important;
    }

    /* Pie chart — white inter-segment strokes, DT title */
    .pieCircle {
      stroke: #FFFFFF !important;
      stroke-width: 2px !important;
    }
    .pieTitleText {
      fill: #00092F !important;
      font-weight: 700 !important;
      font-size: 16px !important;
    }
    .legend text {
      fill: #00092F !important;
      font-family: 'DTFlow', sans-serif !important;
      font-size: 12px !important;
    }
    .slice {
      fill: #FFFFFF !important;
      font-weight: 500 !important;
      font-size: 12px !important;
    }
  `

  return {
    theme: 'base',
    htmlLabels: false,
    themeCSS,
    flowchart: {
      padding: 8,
      nodeSpacing: 30,
      rankSpacing: 40,
      subGraphTitleMargin: { top: 4, bottom: 6 },
      curve: 'basis',
      useMaxWidth: true,
    },
    sequence: {
      diagramMarginX: 20,
      diagramMarginY: 10,
      actorMargin: 60,
      boxMargin: 6,
      messageMargin: 28,
      mirrorActors: false,
      useMaxWidth: true,
    },
    pie: {
      useMaxWidth: true,
    },
    themeVariables: {
      // Canvas
      background:          '#FFFFFF',
      mainBkg:             '#1866FE',  // accent1 — primary node
      secondBkg:           '#7F1AFE',  // accent2
      tertiaryBkg:         '#01D393',  // accent3

      // Node borders — same colors as fills (clean PPT look, no contrasting outlines)
      primaryBorderColor:  '#1866FE',
      secondaryBorderColor:'#7F1AFE',
      tertiaryBorderColor: '#01D393',

      // Text — white on filled nodes, navy on light surfaces
      primaryTextColor:    '#FFFFFF',
      secondaryTextColor:  '#FFFFFF',
      tertiaryTextColor:   '#FFFFFF',
      lineColor:           '#D8D9D8',  // PPT gridline gray (bg2 / dt-gray)

      // ── Sequence diagrams ──────────────────────────────────────────
      actorBkg:            '#1866FE',
      actorBorder:         '#1866FE',
      actorTextColor:      '#FFFFFF',
      actorLineColor:      '#7F1AFE',  // accent2 lifelines
      signalColor:         '#00092F',  // navy arrows
      signalTextColor:     '#00092F',
      labelBoxBkgColor:    '#FFFFFF',
      labelBoxBorderColor: '#D8D9D8',
      labelTextColor:      '#00092F',
      loopTextColor:       '#00092F',
      noteBkgColor:        '#FFF7D6',  // light yellow tint for notes (legible)
      noteBorderColor:     '#FDC300',
      noteTextColor:       '#00092F',
      activationBkgColor:  '#01D393',
      activationBorderColor:'#01D393',

      // ── Flowchart ──────────────────────────────────────────────────
      clusterBkg:          'rgba(24,102,254,0.06)',
      clusterBorder:       '#D8D9D8',
      defaultLinkColor:    '#D8D9D8',  // edges match PPT gridline color
      titleColor:          '#00092F',
      edgeLabelBackground: '#FFFFFF',
      nodeTextColor:       '#FFFFFF',

      // Class diagrams
      classText:           '#FFFFFF',

      // ── Git graph (PPT chart palette cycle: accent1 → accent6) ────
      git0:                '#1866FE',
      git1:                '#7F1AFE',
      git2:                '#01D393',
      git3:                '#85ADFF',
      git4:                '#C499FE',
      git5:                '#5CFDCC',
      git6:                '#1866FE',
      gitBranchLabel0:     '#FFFFFF',
      gitBranchLabel1:     '#FFFFFF',
      gitBranchLabel2:     '#00092F',
      gitBranchLabel3:     '#00092F',
      gitBranchLabel4:     '#00092F',
      gitBranchLabel5:     '#00092F',
      gitBranchLabel6:     '#FFFFFF',

      // ── Pie charts (PPT chart palette cycle: accent1 → accent6) ───
      pie1:                '#1866FE',
      pie2:                '#7F1AFE',
      pie3:                '#01D393',
      pie4:                '#85ADFF',
      pie5:                '#C499FE',
      pie6:                '#5CFDCC',
      pie7:                '#1866FE',
      pie8:                '#7F1AFE',
      pie9:                '#01D393',
      pie10:               '#85ADFF',
      pie11:               '#C499FE',
      pie12:               '#5CFDCC',
      pieTitleTextColor:   '#00092F',
      pieSectionTextColor: '#FFFFFF',
      pieLegendTextColor:  '#00092F',
      pieStrokeColor:      '#FFFFFF',  // white inter-segment strokes
      pieOuterStrokeColor: '#FFFFFF',
      pieOuterStrokeWidth: '0',

      // State diagrams
      stateBkg:            '#1866FE',
      stateBorder:         '#1866FE',
      compositeBackground: 'rgba(24,102,254,0.06)',
      altBackground:       'rgba(1,211,147,0.10)',
      specialStateColor:   '#01D393',

      // ER diagrams
      attributeBackgroundColorEven: 'rgba(24,102,254,0.06)',
      attributeBackgroundColorOdd:  '#FFFFFF',

      // Gantt
      sectionBkgColor:     'rgba(24,102,254,0.10)',
      altSectionBkgColor:  'rgba(127,26,254,0.10)',
      sectionBkgColor2:    'rgba(1,211,147,0.10)',
      taskTextColor:        '#FFFFFF',
      taskTextOutsideColor: '#00092F',
      taskTextClickableColor: '#1866FE',
      activeTaskBorderColor: '#01D393',
      activeTaskBkgColor:   '#01D393',
      doneTaskBkgColor:     '#1866FE',
      doneTaskBorderColor:  '#1866FE',
      critBkgColor:         '#F43D5A',
      critBorderColor:      '#F43D5A',
      todayLineColor:       '#01D393',
      gridColor:            '#D8D9D8',
    },
  }
})
