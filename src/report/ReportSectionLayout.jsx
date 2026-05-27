export default function ReportSectionLayout({ p, calc }) {
  const cityShort = p.city.split(',')[0].trim();
  const caption = `Figure 1 — HelioScope simulation output • ${p.address}, ${cityShort} • ${calc.totalDCkW.toLocaleString()} kW DC`;

  return (
    <div className="section">
      <div className="section-title">Proposed Array Layout</div>
      <div className="card">
        {p.layoutImageDataUrl ? (
          <img src={p.layoutImageDataUrl} alt={`HelioScope Array Layout — ${p.address}`} className="layout-photo" />
        ) : (
          <div className="photo-placeholder">
            <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            </svg>
            <p>Array Layout / HelioScope Output</p>
            <small>Upload the layout image on the <strong>Project Inputs</strong> tab</small>
          </div>
        )}
        <div className="photo-caption">{caption}</div>
      </div>
    </div>
  );
}
