import { useState, useId } from 'react';

/**
 * Collapsible form section.
 *
 * Props:
 *   title        {string}   Section heading
 *   defaultOpen  {boolean}  Initial open state (default true); overridden by localStorage
 *   hasErrors    {boolean}  When true, forces section open and shows a red dot on the header
 */
export default function SectionWrapper({ title, children, defaultOpen = true, hasErrors = false }) {
  const storageKey = `gcsr_section_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

  const [localOpen, setLocalOpen] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? JSON.parse(saved) : defaultOpen;
    } catch {
      return defaultOpen;
    }
  });

  // Derive open: always show when the section has validation errors
  const open = localOpen || hasErrors;

  const toggle = () => {
    // If forced open by errors, a click collapses back to the persisted state (false)
    setLocalOpen(o => {
      const next = hasErrors ? false : !o;
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* ignore */ }
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
