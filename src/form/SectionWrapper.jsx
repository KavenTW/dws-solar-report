import { useState, useId } from 'react';
import { useSectionCollapse } from '../context/SectionCollapseContext';

/**
 * Collapsible form section.
 *
 * Props:
 *   title        {string}   Section heading
 *   defaultOpen  {boolean}  Initial open state (default true); overridden by localStorage
 *   hasErrors    {boolean}  When true, forces section open and shows a red dot on the header
 */
export default function SectionWrapper({ title, children, defaultOpen = true, hasErrors = false, headerExtras, collapseWhen = false }) {
  const storageKey = `gcsr_section_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

  const [localOpen, setLocalOpen] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? JSON.parse(saved) : defaultOpen;
    } catch {
      return defaultOpen;
    }
  });

  // Respond to Expand All / Collapse All. Uses the "adjust state during
  // render" pattern (react.dev) instead of a setState-in-effect, which would
  // trigger a cascading second render.
  const { override, tick } = useSectionCollapse();
  const [appliedTick, setAppliedTick] = useState(tick);
  if (tick !== appliedTick) {
    setAppliedTick(tick);
    if (override === 'open' || override === 'closed') {
      setLocalOpen(override === 'open' && !collapseWhen);
    }
  }

  // Derive open: excluded-from-report sections render collapsed (and reopen to
  // their previous state when re-included); validation errors force open.
  const open = !collapseWhen && (localOpen || hasErrors);

  const toggle = () => {
    // If forced open by errors, a click collapses back to the persisted state (false)
    setLocalOpen(o => {
      const next = hasErrors ? false : !o;
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (e) { console.warn('SectionWrapper: failed to persist collapsed state', e); }
      return next;
    });
  };

  const contentId = useId();
  const headerId = useId();

  return (
    <div className="form-section">
      <button
        id={headerId}
        className={`form-section-header ${open ? 'open' : ''}`}
        onClick={toggle}
        aria-expanded={open}
        aria-controls={contentId}
      >
        <span className="form-section-title">
          {title}
          {hasErrors && <span className="section-error-dot" aria-label="has errors" />}
        </span>
        {headerExtras && (
          <span className="form-section-header-extras" onClick={e => e.stopPropagation()}>
            {headerExtras}
          </span>
        )}
        <span className={`form-section-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      {open && (
        <div
          id={contentId}
          className="form-section-body"
          role="region"
          aria-labelledby={headerId}
        >
          {children}
        </div>
      )}
    </div>
  );
}
