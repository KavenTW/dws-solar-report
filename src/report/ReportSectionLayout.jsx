export default function ReportSectionLayout({ p, calc }) {
  const cityShort = p.city.split(',')[0].trim();
  const caption = `Simulated using HelioScope (NREL / NASA POWER) — ${p.address}, ${cityShort} — ${calc.totalDCkW.toLocaleString()} kW DC`;
  const hasLocationData = p.siteLatLong || p.siteClimateZone || p.sitePSH || p.siteGHI || p.siteAvgTemp;

  return (
    <div className="section section--no-break">
      <div className="section-title">Illustrative Solar Array Layout</div>
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

        {hasLocationData && (
          <table className="fin-table" style={{ marginTop: '16px' }}>
            <tbody>
              {(p.address || p.city) && <tr><td>Address</td><td>{[p.address, p.city].filter(Boolean).join(', ')}</td></tr>}
              {p.siteLatLong     && <tr><td>Lat / Long</td><td>{p.siteLatLong.split(',').map(v => { const n = parseFloat(v); return isNaN(n) ? v.trim() : n.toFixed(5); }).join(', ')}</td></tr>}
              {p.siteClimateZone && <tr><td>Climate Zone</td><td>{p.siteClimateZone}</td></tr>}
              {p.sitePSH         && <tr><td>Avg. Peak Sun Hours</td><td>{p.sitePSH}</td></tr>}
              {p.siteGHI         && <tr><td>Annual GHI</td><td>{p.siteGHI}</td></tr>}
              {p.siteAvgTemp     && <tr><td>Avg. Annual Temperature</td><td>{p.siteAvgTemp}</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
