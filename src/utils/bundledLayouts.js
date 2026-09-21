import { DWS_LAYOUT_IMAGES } from '../constants/dwsDataset';

// The 14 HelioScope layouts ship in the deploy under /layouts. They are served
// straight to the <img>, never copied into localStorage: the whole set is ~11 MB
// of PNG, which no browser would store, and compressing it down to fit cost
// resolution for no benefit — the browser already has the files.
//
// Lookup is by asset name, normalized, because saved projects carry whatever
// name they were stored under (several are dated, e.g. "Eastland Center
// 2026.07.02") while the map is keyed by the asset's own name.
const normalize = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const BY_NAME = new Map(
  Object.entries(DWS_LAYOUT_IMAGES).map(([name, src]) => [normalize(name), src])
);

/**
 * Path to the bundled layout for an asset, or null when there is no match.
 * Tries the exact name first, then a saved name that merely starts with it
 * ("Eastland Center 2026.07.02" → "Eastland Center").
 */
export function bundledLayoutFor(...names) {
  for (const name of names) {
    const key = normalize(name);
    if (!key) continue;
    if (BY_NAME.has(key)) return BY_NAME.get(key);
    for (const [k, src] of BY_NAME) if (key.startsWith(k)) return src;
  }
  return null;
}
