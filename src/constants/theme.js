export const CHART_COLORS = [
  { line: '#005FAB', fill: 'rgba(0,95,171,0.07)',   filled: false },
  { line: '#16a34a', fill: 'rgba(22,163,74,0.04)',  filled: true  },
  { line: '#FBA31B', fill: 'rgba(251,163,27,0.04)', filled: false },
];

export const BAR_COLOR_THRESHOLDS = { high: 0.90, mid: 0.70 };
export const BAR_COLORS = { high: '#FFCE02', mid: '#FBA31B', low: '#93c5fd' };

// These match --muted and --border in index.css :root — kept here so Chart.js
// config (which can't read CSS variables) has a single source of truth.
export const CHART_AXIS_COLOR = '#6b7280';
export const CHART_GRID_COLOR = '#e2e8f0';
