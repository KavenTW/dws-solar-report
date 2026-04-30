import { useState } from 'react';

export default function SectionWrapper({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="form-section">
      <button className={`form-section-header ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
        {title}
        <span className={`form-section-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      {open && <div className="form-section-body">{children}</div>}
    </div>
  );
}
