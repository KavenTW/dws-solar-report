const TECHNICAL_ITEMS = [
  { category: 'Structural',             notes: 'Confirm structural capacity availability and limitations' },
  { category: 'Roof',                   notes: 'Evaluate roof conditions including age, type, and condition' },
  { category: 'Geotechnical',           notes: 'Perform any relevant geotechnical assessments, particularly for carport structures', carportOnly: true },
  { category: 'Electrical',             notes: 'Confirm on-site electrical infrastructure and limitations' },
  { category: 'Site Plan Constraints',  notes: 'Evaluate any limitations imposed by applicable site/civil/zoning plans' },
  { category: 'System Design',          notes: 'Develop comprehensive final system design given local requirements' },
  { category: 'Utility Interconnection',notes: 'Coordinate with locally licensed electrical engineer to develop single-line diagrams required for utility interconnection. Prepare, submit, and manage utility interconnection.' },
];

function fmt(min, max) {
  if (min == null && max == null) return '';
  const f = v => '$' + v.toLocaleString();
  return min === max ? f(min) : `${f(min)} – ${f(max)}`;
}

export default function ReportSectionNextSteps({ p }) {
  const hasCarport = (p.carportSizeDCkW || 0) > 0 || (p.carportAreaUsedSqFt || 0) > 0;
  const points = Math.max(1, Math.round(p.pointsOfInterconnection || 1));

  const feasItems = [
    { label: 'GCS Pre-Feasibility',                      min: null,                     max: null,                     note: '' },
    { label: 'Structural Feasibility',                   min: p.feasStructuralMin,      max: p.feasStructuralMax,      note: 'Cost relates to number of roof structures' },
    ...(hasCarport ? [{ label: 'Geotechnical Feasibility', min: p.feasGeotechnicalMin, max: p.feasGeotechnicalMax,    note: 'For carport solar' }] : []),
    { label: 'Electrical Feasibility',                   min: p.feasElectricalMin * points, max: p.feasElectricalMax * points, note: `${points} point${points !== 1 ? 's' : ''} of interconnection × ${fmt(p.feasElectricalMin, p.feasElectricalMax)}/point` },
    { label: 'Utility Interconnection Documentation',    min: p.feasInterconnectionMin, max: p.feasInterconnectionMax, note: '' },
  ];

  const totalMin = feasItems.reduce((s, i) => s + (i.min || 0), 0);
  const totalMax = feasItems.reduce((s, i) => s + (i.max || 0), 0);

  return (
    <div className="section section--next-steps">
      <div className="section-title">Further Detailed Analysis Required</div>
      <div className="card">
        <table className="fin-table" style={{ width: '100%' }}>
          <thead>
            <tr className="sub-header">
              <th style={{ width: '28%' }}>Category</th>
              <th>Item / Notes</th>
            </tr>
          </thead>
          <tbody>
            {TECHNICAL_ITEMS.filter(i => !i.carportOnly || hasCarport).map(({ category, notes }) => (
              <tr key={category}>
                <td><strong>{category}</strong></td>
                <td>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {p.additionalNotes && (
          <div style={{ marginTop: '24px' }}>
            <div className="card-title" style={{ marginBottom: '10px' }}>Additional Notes</div>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {p.additionalNotes.split('\n').filter(Boolean).map((line, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '16px', breakBefore: 'avoid', pageBreakBefore: 'avoid' }}>
        <div className="card-title">Indicative Feasibility Cost Estimates</div>

        <table className="fin-table" style={{ width: '100%' }}>
          <thead>
            <tr className="sub-header">
              <th style={{ width: '35%' }}>Scope</th>
              <th style={{ width: '20%' }}>Est. Cost</th>
              <th style={{ width: '15%' }}>Timeline</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {feasItems.map(({ label, min, max, note }) => {
              const hasCost = !(min == null && max == null);
              return (
                <tr key={label}>
                  <td><strong>{label}</strong></td>
                  <td>{fmt(min, max)}</td>
                  <td>{hasCost ? '~4 weeks' : ''}</td>
                  <td style={{ fontSize: '11px', color: 'var(--muted)' }}>{note}</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>{fmt(totalMin, totalMax)}</strong></td>
              <td><strong>~4 weeks</strong></td>
              <td style={{ fontSize: '11px' }}>All workstreams run concurrently</td>
            </tr>
          </tbody>
        </table>

        <div className="footnote" style={{ marginTop: '10px' }}>
          Note: All feasibility studies must be completed by locally licensed and certified engineering firms. Quotes are indicative, sourced from independent third-party firms based on system sizing above. Final quotations depend on actual on-site conditions. Cost drivers: points of interconnection (electrical), number of roof structures (structural){hasCarport ? ', presence of carport structures (geotechnical)' : ''}.
        </div>

        <div className="stage-gate-box" style={{ marginTop: '14px' }}>
          <div className="stage-gate-title">A flexible, stage-gated approach</div>
          <p className="stage-gate-intro">
            Building on our completed pre-feasibility, the remaining studies can be sequenced rather than run at once — each gate lets the project proceed, pause, or redirect before further cost is committed.
          </p>
          <div className="stage-gate-steps">
            <span className="stage-gate-step">Structural</span>
            <span className="stage-gate-arrow">→</span>
            {hasCarport && <><span className="stage-gate-step">Geotechnical</span><span className="stage-gate-arrow">→</span></>}
            <span className="stage-gate-step">Electrical</span>
            <span className="stage-gate-arrow">→</span>
            <span className="stage-gate-step">Interconnection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
