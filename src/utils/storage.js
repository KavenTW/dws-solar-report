const STORAGE_KEY = 'gcsr_projects';
const SIZE_WARN_BYTES = 4 * 1024 * 1024; // 4 MB
export const CURRENT_VERSION = 4;

/**
 * Applies any schema migrations needed to bring an older saved entry up to the
 * current version.  Add new `if (entry.version < N)` blocks here as the schema
 * evolves — never mutate the data in place, always return a new entry object.
 */
function migrateProject(entry) {
  // v0 → v1: version field didn't exist before this infrastructure was added.
  // No data-shape changes at this point; just stamp the version.
  if ((entry.version ?? 0) < 1) {
    entry = { ...entry, version: 1 };
  }
  // v1 → v2: report section visibility flags added.
  if (entry.version < 2) {
    entry = {
      ...entry,
      data: {
        ...entry.data,
        showLayoutSection:     entry.data.showLayoutSection     ?? true,
        showGenerationSection: entry.data.showGenerationSection ?? true,
        showSavingsSection:    entry.data.showSavingsSection    ?? true,
        showChartSection:      entry.data.showChartSection      ?? true,
        showSiteInfoSection:   entry.data.showSiteInfoSection   ?? true,
      },
      version: 2,
    };
  }
  // v2 → v3: cover, overview, and disclaimer visibility flags added.
  if (entry.version < 3) {
    entry = {
      ...entry,
      data: {
        ...entry.data,
        showCoverSection:      entry.data.showCoverSection      ?? true,
        showOverviewSection:   entry.data.showOverviewSection   ?? true,
        showDisclaimerSection: entry.data.showDisclaimerSection ?? true,
      },
      version: 3,
    };
  }
  // v3 → v4: replace shared flags with per-section flags; add market context fields.
  if (entry.version < 4) {
    const d = entry.data;
    entry = {
      ...entry,
      data: {
        ...d,
        // Per-section flags — inherit from the old shared flag they belonged to
        showFeaturesSection:      d.showFeaturesSection      ?? true,
        showSystemSection:        d.showSystemSection        ?? (d.showOverviewSection   ?? true),
        showRoofSection:          d.showRoofSection          ?? (d.showOverviewSection   ?? true),
        showPPATermsSection:      d.showPPATermsSection      ?? (d.showSavingsSection    ?? true),
        showRECsSection:          d.showRECsSection          ?? (d.showSavingsSection    ?? true),
        showWAIRESection:         d.showWAIRESection         ?? (d.showSavingsSection    ?? true),
        showDegradationSection:   d.showDegradationSection   ?? (d.showChartSection      ?? true),
        showEmissionsSection:     d.showEmissionsSection     ?? (d.showGenerationSection ?? true),
        showMarketContextSection: d.showMarketContextSection ?? true,
        // Market context fields — backfill to empty strings / empty arrays
        marketContextTitle:              d.marketContextTitle              ?? 'California Market Context',
        marketContextDescription:        d.marketContextDescription        ?? '',
        marketContextMonetizationHeader: d.marketContextMonetizationHeader ?? 'Monetization Opportunities',
        marketContextMonetizationIntro:  d.marketContextMonetizationIntro  ?? '',
        marketContextMonetizationRows:   d.marketContextMonetizationRows   ?? [],
        marketContextImplicationHeader:  d.marketContextImplicationHeader  ?? 'Strategic Implication',
        marketContextImplicationIntro:   d.marketContextImplicationIntro   ?? '',
        marketContextImplicationRows:    d.marketContextImplicationRows    ?? [],
      },
      version: 4,
    };
  }
  return entry;
}

export function loadAllProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw).map(migrateProject) : [];
  } catch {
    return [];
  }
}

function saveAll(projects) {
  const json = JSON.stringify(projects);
  if (json.length > SIZE_WARN_BYTES) {
    console.warn(`localStorage projects approaching limit: ${(json.length / 1024 / 1024).toFixed(1)} MB`);
  }
  localStorage.setItem(STORAGE_KEY, json);
}

export function saveProject(data, name) {
  const projects = loadAllProjects();
  const existing = projects.findIndex(p => p.name === name);
  const entry = {
    id: existing >= 0 ? projects[existing].id : crypto.randomUUID(),
    name,
    savedAt: new Date().toISOString(),
    version: CURRENT_VERSION,
    data,
  };
  if (existing >= 0) {
    projects[existing] = entry;
  } else {
    projects.push(entry);
  }
  saveAll(projects);
  return entry;
}

export function deleteProject(name) {
  const projects = loadAllProjects().filter(p => p.name !== name);
  saveAll(projects);
}

export function exportProjectJSON(data, name) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/[^a-z0-9]/gi, '_')}_project.json`;
  a.click();
  URL.revokeObjectURL(url);
}
