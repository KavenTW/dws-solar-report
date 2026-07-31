import { TECHNICAL_ITEMS } from '../../constants/technicalItems';

export default function PortfolioNextSteps({ pf }) {
  return (
    <div className="section portfolio-page portfolio-page--flow">
      <div className="section-title">Next Steps</div>
      <div className="card">
        {pf.nextSteps.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className="portfolio-para">{para}</p>
        ))}

        <div className="state-block" style={{ marginTop: '16px' }}>
          <div className="state-block-title">Scope of Further Detailed Analysis</div>
          <table className="fin-table" style={{ width: '100%' }}>
            <thead>
              <tr className="sub-header">
                <th style={{ width: '28%' }}>Category</th>
                <th>Item / Notes</th>
              </tr>
            </thead>
            <tbody>
              {TECHNICAL_ITEMS.map(({ category, notes }) => (
                <tr key={category}>
                  <td><strong>{category}</strong></td>
                  <td>{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        {pf.nextActions && (
          <div className="state-block" style={{ marginTop: '16px' }}>
            <div className="state-block-title">Proposed Immediate Actions</div>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {pf.nextActions.split('\n').filter(Boolean).map((line, i) => (
                <li key={i} className="portfolio-para" style={{ marginBottom: '4px' }}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
