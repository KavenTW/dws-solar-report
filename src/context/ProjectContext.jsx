import { createContext, useContext, useReducer, useEffect } from 'react';
import { DEFAULT_PROJECT } from '../constants/defaults';
import { loadAllProjects, saveProject, deleteProject } from '../utils/storage';

const ProjectContext = createContext(null);

const initialState = {
  project: { ...DEFAULT_PROJECT },
  formErrors: {},
  activeTab: 'inputs',
  savedProjects: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        project: { ...state.project, [action.key]: action.value },
        formErrors: { ...state.formErrors, [action.key]: undefined },
      };
    case 'UPDATE_MONTHLY_PCT': {
      const pct = [...state.project.monthlyPct];
      pct[action.index] = action.value;
      return { ...state, project: { ...state.project, monthlyPct: pct } };
    }
    case 'UPDATE_ESC_RATE': {
      const rates = [...state.project.utilityEscalationRates];
      rates[action.index] = action.value;
      return { ...state, project: { ...state.project, utilityEscalationRates: rates } };
    }
    case 'SET_TAB':
      return { ...state, activeTab: action.tab };
    case 'LOAD_PROJECT':
      return {
        ...state,
        project: { ...DEFAULT_PROJECT, ...action.data },
        formErrors: {},
      };
    case 'SET_LAYOUT_IMAGE':
      return { ...state, project: { ...state.project, layoutImageDataUrl: action.dataUrl } };
    case 'SET_FORM_ERRORS':
      return { ...state, formErrors: action.errors };
    case 'SET_SAVED_PROJECTS':
      return { ...state, savedProjects: action.projects };
    case 'SAVE_PROJECT': {
      const entry = saveProject(state.project, action.name);
      const existing = state.savedProjects.findIndex(p => p.name === action.name);
      const updated = existing >= 0
        ? state.savedProjects.map((p, i) => i === existing ? entry : p)
        : [...state.savedProjects, entry];
      return { ...state, savedProjects: updated };
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

  useEffect(() => {
    dispatch({ type: 'SET_SAVED_PROJECTS', projects: loadAllProjects() });
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
