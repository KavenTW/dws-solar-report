export default function PortfolioNextSteps({ pf }) {
  return (
    <div className="section portfolio-page">
      <div className="section-title">Next Steps</div>
      <div className="card">
        {pf.nextSteps.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className="portfolio-para">{para}</p>
        ))}
        <div className="stage-gate-box" style={{ marginTop: '14px' }}>
          <div className="stage-gate-title">A flexible, stage-gated approach</div>
          <p className="stage-gate-intro">
            Building on completed pre-feasibility, the remaining studies can be sequenced per asset — each gate lets a project proceed, pause, or redirect before further cost is committed.
          </p>
          <div className="stage-gate-steps">
            <span className="stage-gate-step">Structural</span>
            <span className="stage-gate-arrow">→</span>
            <span className="stage-gate-step">Geotechnical (carport sites)</span>
            <span className="stage-gate-arrow">→</span>
            <span className="stage-gate-step">Electrical</span>
            <span className="stage-gate-arrow">→</span>
            <span className="stage-gate-step">Interconnection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
