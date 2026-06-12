const STORAGE_KEY = 'gcsr_projects';
const DRAFT_KEY = 'gcsr_draft';
const SIZE_WARN_BYTES = 4 * 1024 * 1024; // 4 MB
export const CURRENT_VERSION = 7;

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
  // v4 → v5: replace systemSizeDCkW with rooftop/carport split; rename roof area fields; remove moduleWp.
  if (entry.version < 5) {
    const d = entry.data;
    entry = {
      ...entry,
      data: {
        ...d,
        rooftopSizeDCkW:     d.rooftopSizeDCkW     ?? d.systemSizeDCkW ?? 0,
        carportSizeDCkW:     d.carportSizeDCkW     ?? 0,
        rooftopAreaUsedSqFt: d.rooftopAreaUsedSqFt ?? d.roofUsedSqFt   ?? 0,
        rooftopTotalSqFt:    d.rooftopTotalSqFt    ?? d.roofTotalSqFt  ?? 0,
        carportAreaUsedSqFt: d.carportAreaUsedSqFt ?? 0,
        carportTotalSqFt:    d.carportTotalSqFt    ?? 0,
      },
      version: 5,
    };
  }
  // v5 → v6: add additionalNotes and showNextStepsSection
  if (entry.version < 6) {
    const d = entry.data;
    entry = {
      ...entry,
      data: {
        ...d,
        additionalNotes:      d.additionalNotes      ?? 'Actual design would have to take into consideration other site plan requirements and constraints such as trees and parking lighting',
        showNextStepsSection: d.showNextStepsSection  ?? true,
      },
      version: 6,
    };
  }
  // v6 → v7: AC rooftop/carport split, monthly-table toggle, feasibility cost fields.
  if (entry.version < 7) {
    const d = entry.data;
    entry = {
      ...entry,
      data: {
        ...d,
        rooftopSizeACkW: d.rooftopSizeACkW ?? d.systemSizeACkW ?? 0,
        carportSizeACkW: d.carportSizeACkW ?? 0,
        // Projects saved before the toggle existed always showed the table — preserve that.
        showMonthlyTable: d.showMonthlyTable ?? true,
        feasElectricalMin:      d.feasElectricalMin      ?? 5000,
        feasElectricalMax:      d.feasElectricalMax      ?? 10000,
        feasStructuralMin:      d.feasStructuralMin      ?? 5000,
        feasStructuralMax:      d.feasStructuralMax      ?? 15000,
        feasGeotechnicalMin:    d.feasGeotechnicalMin    ?? 10000,
        feasGeotechnicalMax:    d.feasGeotechnicalMax    ?? 15000,
        feasInterconnectionMin: d.feasInterconnectionMin ?? 5000,
        feasInterconnectionMax: d.feasInterconnectionMax ?? 5000,
      },
      version: 7,
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
  // Deliberately NOT caught: QuotaExceededError must propagate so explicit
  // saves can surface the failure in the UI instead of silently losing data.
  localStorage.setItem(STORAGE_KEY, json);
}

// ── Working-draft persistence (best-effort crash/close protection) ──────────
export function saveDraft(project) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ version: CURRENT_VERSION, data: project }));
  } catch {
    // Draft autosave is best-effort: a quota failure here must never interrupt typing.
  }
}

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return migrateProject(JSON.parse(raw)).data;
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // removeItem can only fail in exotic privacy modes; nothing to do.
  }
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
