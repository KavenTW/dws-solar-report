/**
 * Executive summary: editable narrative + a KPI strip computed live from the
 * included projects, so headline figures always match the body reports.
 */
export default function PortfolioExecSummary({ pf, projects }) {
  const ok = projects.filter(x => x.calc);
  const totalDC = ok.reduce((s, x) => s + (x.calc.totalDCkW || 0), 0);
  const totalMwh = ok.reduce((s, x) => s + (x.calc.annualMwh || 0), 0);
  const totalLifetimeCO2e = ok.reduce((s, x) => s + (x.calc.lifetimeCO2e || 0), 0);
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
          <div className="kpi-label">Est. Lifetime Carbon Abatement</div>
          <div className="kpi-value">{(Math.round(totalLifetimeCO2e / 100) * 100).toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>t CO₂e</span></div>
          <div className="kpi-unit">all assets combined, over term</div>
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
