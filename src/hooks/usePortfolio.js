import { useState, useEffect } from 'react';
import { PORTFOLIO_DEFAULTS } from '../constants/portfolioDefaults';

const PORTFOLIO_KEY = 'gcsr_portfolio';
const PORTFOLIO_VERSION = 1;

function loadPortfolio() {
  try {
    const raw = localStorage.getItem(PORTFOLIO_KEY);
    if (!raw) return { ...PORTFOLIO_DEFAULTS };
    const saved = JSON.parse(raw).data || {};
    // Deep-merge per-state blocks so seed fields added later still appear.
    const states = Object.fromEntries(
      Object.entries(PORTFOLIO_DEFAULTS.states).map(([abbr, seed]) => [
        abbr,
        { ...seed, ...(saved.states?.[abbr] || {}) },
      ])
    );
    return { ...PORTFOLIO_DEFAULTS, ...saved, states };
  } catch {
    return { ...PORTFOLIO_DEFAULTS };
  }
}

/**
 * Portfolio document state — persisted immediately to localStorage
 * (gcsr_portfolio). Content is small (text only), so no debounce is needed.
 */
export function usePortfolio() {
  const [pf, setPf] = useState(loadPortfolio);

  useEffect(() => {
    try {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify({ version: PORTFOLIO_VERSION, data: pf }));
    } catch {
      // Text-only payload; quota failure here is not user-data loss.
    }
  }, [pf]);

  const set = (key, value) => setPf(prev => ({ ...prev, [key]: value }));
  const setStateField = (abbr, key, value) =>
    setPf(prev => ({ ...prev, states: { ...prev.states, [abbr]: { ...prev.states[abbr], [key]: value } } }));
  const setTocPage = (slug, value) =>
    setPf(prev => ({ ...prev, tocPages: { ...prev.tocPages, [slug]: value } }));
  const toggleProject = name =>
    setPf(prev => ({
      ...prev,
      excludedProjects: prev.excludedProjects.includes(name)
        ? prev.excludedProjects.filter(n => n !== name)
        : [...prev.excludedProjects, name],
    }));

  // Replace all text content with the latest seeds; keeps report selections
  // and TOC page numbers. Used after seed copy improves upstream — saved text
  // otherwise wins over new seeds by design.
  const resetContent = () =>
    setPf(prev => ({
      ...PORTFOLIO_DEFAULTS,
      excludedProjects: prev.excludedProjects,
      tocPages: prev.tocPages,
    }));

  return { pf, set, setStateField, setTocPage, toggleProject, resetContent };
}
