import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { DEFAULT_PROJECT } from '../constants/defaults';
import { loadAllProjects, deleteProject, saveDraft, loadDraft, clearDraft } from '../utils/storage';

const ProjectContext = createContext(null);

const initialState = {
  project: { ...DEFAULT_PROJECT },
  formErrors: {},
  activeTab: 'inputs',
  savedProjects: [],
  // True whenever the working project differs from the last explicit save/load.
  // Drives draft autosave and the unsaved-changes prompt.
  dirty: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        project: { ...state.project, [action.key]: action.value },
        formErrors: { ...state.formErrors, [action.key]: undefined },
        dirty: true,
      };
    case 'UPDATE_MONTHLY_PCT': {
      const pct = [...state.project.monthlyPct];
      pct[action.index] = action.value;
      return { ...state, project: { ...state.project, monthlyPct: pct }, dirty: true };
    }
    case 'UPDATE_ESC_RATE': {
      const rates = [...state.project.utilityEscalationRates];
      rates[action.index] = action.value;
      return { ...state, project: { ...state.project, utilityEscalationRates: rates }, dirty: true };
    }

    // ── Distribution actions ──────────────────────────────────────────────
    case 'SELECT_DISTRIBUTION': {
      const dist = state.project.monthlyDistributions[action.index];
      if (!dist) return state;
      return {
        ...state,
        project: {
          ...state.project,
          activeDistributionIndex: action.index,
          monthlyPct: [...dist.pct],
        },
        formErrors: { ...state.formErrors, monthlyPct: undefined },
        dirty: true,
      };
    }
    case 'UPDATE_DISTRIBUTION_PCT': {
      const dists = state.project.monthlyDistributions.map((d, i) =>
        i === action.distIndex
          ? { ...d, pct: d.pct.map((v, j) => (j === action.monthIndex ? action.value : v)) }
          : d
      );
      const updates = { monthlyDistributions: dists };
      // Keep monthlyPct in sync with the active distribution
      if (action.distIndex === state.project.activeDistributionIndex) {
        updates.monthlyPct = dists[action.distIndex].pct;
      }
      return { ...state, project: { ...state.project, ...updates }, dirty: true };
    }
    case 'UPDATE_DISTRIBUTION_LABEL': {
      const dists = state.project.monthlyDistributions.map((d, i) =>
        i === action.index ? { ...d, label: action.label } : d
      );
      return { ...state, project: { ...state.project, monthlyDistributions: dists }, dirty: true };
    }
    // ─────────────────────────────────────────────────────────────────────

    case 'SET_TAB':
      return { ...state, activeTab: action.tab };
    case 'LOAD_PROJECT':
      clearDraft();
      return {
        ...state,
        project: { ...DEFAULT_PROJECT, ...action.data },
        formErrors: {},
        dirty: false,
      };
    case 'RESTORE_DRAFT':
      // A restored draft is, by definition, unsaved work — keep it dirty and
      // keep the draft on disk until the user explicitly saves or loads.
      return {
        ...state,
        project: { ...DEFAULT_PROJECT, ...action.data },
        formErrors: {},
        dirty: true,
      };
    case 'SET_LAYOUT_IMAGE':
      return { ...state, project: { ...state.project, layoutImageDataUrl: action.dataUrl }, dirty: true };
    case 'SET_FORM_ERRORS':
      return { ...state, formErrors: action.errors };
    case 'SET_SAVED_PROJECTS':
      return { ...state, savedProjects: action.projects };
    case 'SAVE_PROJECT_SUCCESS': {
      // The write already happened (in SaveLoadBar, where failures surface in
      // the UI) — this just records the result and resets the dirty baseline.
      clearDraft();
      const existing = state.savedProjects.findIndex(p => p.name === action.entry.name);
      const updated = existing >= 0
        ? state.savedProjects.map((p, i) => i === existing ? action.entry : p)
        : [...state.savedProjects, action.entry];
      return { ...state, savedProjects: updated, dirty: false };
    }
    case 'DELETE_PROJECT': {
      deleteProject(action.name);
      return { ...state, savedProjects: state.savedProjects.filter(p => p.name !== action.name) };
    }
    default:
      return state;
  }
}

export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Ref mirror of dirty so the once-registered beforeunload handler reads the
  // current value without re-subscribing on every state change.
  const dirtyRef = useRef(false);
  useEffect(() => {
    dirtyRef.current = state.dirty;
  }, [state.dirty]);

  useEffect(() => {
    dispatch({ type: 'SET_SAVED_PROJECTS', projects: loadAllProjects() });
    const draft = loadDraft();
    if (draft) dispatch({ type: 'RESTORE_DRAFT', data: draft });
  }, []);

  // Debounced draft autosave: best-effort crash/close protection.
  useEffect(() => {
    if (!state.dirty) return;
    const t = setTimeout(() => saveDraft(state.project), 1500);
    return () => clearTimeout(t);
  }, [state.project, state.dirty]);

  useEffect(() => {
    const onBeforeUnload = e => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
}
