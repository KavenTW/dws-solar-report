// Shared chart tokens, so every chart in the document reads as one system.
//
// The two series colours were checked with the dataviz palette validator
// against the printed surface. GCS blue passes as-is. The brand orange
// (#FBA31B) failed two checks — L 0.785, above the lightness band, and 1.98:1
// contrast against the page, which prints faint — so the carport series uses
// the same hue darkened to the nearest passing step. Blue against this orange
// separates at ΔE 26.5 under protanopia and 33.6 for normal vision, well clear
// of the ΔE 8 floor.
export const SERIES_ROOFTOP = '#005FAB';
export const SERIES_CARPORT = '#CC7A00';

// Recessive chrome: labels one step off body ink, gridlines one step off the
// surface, both solid — a dashed grid reads as a threshold that isn't there.
export const CHART_INK = '#6b7280';
export const CHART_GRID = '#e5e7eb';
