const STORAGE_KEY = 'gcsr_projects';
const SIZE_WARN_BYTES = 4 * 1024 * 1024; // 4 MB
export const CURRENT_VERSION = 1;

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
