// Grouping helpers shared by the asset summary table, the executive summary and
// the capacity chart, so every view of the portfolio groups assets identically.
// Kept out of the component files so fast refresh stays happy.

/** "Prioritization Group 1 — Advance" → "Group 1"; falls back to the full name. */
export const groupShortName = name =>
  ((name || '').split('—')[0].trim() || name || '').replace(/^Prioritization\s+/i, '');

/** Asset names are typed by hand in the group fields — match forgivingly. */
export const normalize = s =>
  (s || '').toLowerCase().replace(/\s+/g, ' ').replace(/ solar$/, '').trim();

/** Map of normalized asset name → short group label. */
export function buildGroupLookup(groups) {
  const map = new Map();
  for (const g of groups || []) {
    for (const assetName of (g.assets || '').split(';')) {
      const key = normalize(assetName);
      if (key) map.set(key, groupShortName(g.name));
    }
  }
  return map;
}

/**
 * Bucket assets by prioritization group, in the order the groups are defined.
 * Assets whose name matches no group collect in a trailing "Unassigned" bucket
 * rather than disappearing from the document.
 */
export function groupAssets(assets, groups) {
  const byShort = new Map();
  const out = (groups || []).map(g => {
    const short = groupShortName(g.name);
    const bucket = { key: short, label: g.name, shortLabel: short, assets: [] };
    byShort.set(short, bucket);
    return bucket;
  });

  const lookup = buildGroupLookup(groups);
  const unassigned = { key: 'unassigned', label: 'Not yet assigned', shortLabel: 'Unassigned', assets: [] };

  for (const a of assets) {
    const name = a.p.projectName || a.entry.name;
    const bucket = byShort.get(lookup.get(normalize(name)));
    (bucket || unassigned).assets.push(a);
  }

  if (unassigned.assets.length) out.push(unassigned);
  return out.filter(g => g.assets.length > 0);
}
