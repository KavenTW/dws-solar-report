import { useState, useId } from 'react';

export default function SectionWrapper({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const headerId = useId();
  return (
    <div className="form-section">
      <button
        id={headerId}
        className={`form-section-header ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={contentId}
      >
        {title}
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
