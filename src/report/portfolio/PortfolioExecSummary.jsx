/**
 * Executive summary: editable narrative + a KPI strip computed live from the
 * included projects, so headline figures always match the body reports.
 */
export default function PortfolioExecSummary({ pf, projects }) {
  const ok = projects.filter(x => x.calc);
  const totalDC = ok.reduce((s, x) => s + (x.calc.totalDCkW || 0), 0);
  const totalMwh = ok.reduce((s, x) => s + (x.calc.annualMwh || 0), 0);
  const totalFootprint = ok.reduce(
    (s, x) => s + (x.p.rooftopAreaUsedSqFt || 0) + (x.p.carportAreaUsedSqFt || 0), 0);
  const stateCount = new Set(ok.map(x => x.p.province)).size;

  return (
    <div className="section portfolio-page">
      <div className="section-title">Executive Summary</div>
      <div className="kpi-grid" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-label">Assets Reviewed</div>
          <div className="kpi-value">{ok.length}</div>
          <div className="kpi-unit">across {stateCount} states</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Maximum Potential Capacity</div>
          <div className="kpi-value">{Math.round(totalDC).toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>kW DC</span></div>
          <div className="kpi-unit">rooftop and carport combined</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Estimated Yr-1 Generation</div>
          <div className="kpi-value">{Math.round(totalMwh).toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>MWh</span></div>
          <div className="kpi-unit">all assets combined</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Solar Footprint</div>
          <div className="kpi-value">{Math.round(totalFootprint).toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>ft²</span></div>
          <div className="kpi-unit">occupied roof and parking area</div>
        </div>
      </div>
      <div className="card">
        {pf.execSummary.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className="portfolio-para">{para}</p>
        ))}
      </div>
    </div>
  );
}
