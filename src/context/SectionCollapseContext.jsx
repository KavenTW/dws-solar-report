import { createContext, useContext, useState } from 'react';

const SectionCollapseContext = createContext({
  override: null, tick: 0, expandAll: () => {}, collapseAll: () => {},
});

export function SectionCollapseProvider({ children }) {
  const [state, setState] = useState({ override: null, tick: 0 });
  const expandAll   = () => setState(s => ({ override: 'open',   tick: s.tick + 1 }));
  const collapseAll = () => setState(s => ({ override: 'closed', tick: s.tick + 1 }));
  return (
    <SectionCollapseContext.Provider value={{ ...state, expandAll, collapseAll }}>
      {children}
    </SectionCollapseContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSectionCollapse() {
  return useContext(SectionCollapseContext);
}
