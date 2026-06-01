const TECHNICAL_ITEMS = [
  { category: 'Electrical',             notes: 'Confirm on-site electrical infrastructure and limitations' },
  { category: 'Structural',             notes: 'Confirm structural capacity availability and limitations' },
  { category: 'Roof',                   notes: 'Evaluate roof conditions including age, type, and condition' },
  { category: 'Geotechnical',           notes: 'Perform any relevant geotechnical assessments, particularly for carport structures', carportOnly: true },
  { category: 'Site Plan Constraints',  notes: 'Evaluate any limitations imposed by applicable site/civil/zoning plans' },
  { category: 'System Design',          notes: 'Develop comprehensive final system design given site specifications' },
  { category: 'Utility Interconnection',notes: 'Coordinate with qualified electrical engineer to develop single-line diagrams required for utility interconnection. Prepare, submit, and manage utility interconnection.' },
];

function fmt(min, max) {
  const f = v => '$' + v.toLocaleString();
  return min === max ? f(min) : `${f(min)} – ${f(max)}`;
}

export default function ReportSectionNextSteps({ p }) {
  const hasCarport = (p.carportSizeDCkW || 0) > 0 || (p.carportAreaUsedSqFt || 0) > 0;

  const feasItems = [
    { label: 'Electrical Feasibility',                  min: p.feasElectricalMin,      max: p.feasElectricalMax,      note: 'Cost relates to number of points of interconnection' },
    { label: 'Structural Feasibility',                   min: p.feasStructuralMin,      max: p.feasStructuralMax,      note: 'Cost relates to number of roof structures' },
    ...(hasCarport ? [{ label: 'Geotechnical Feasibility', min: p.feasGeotechnicalMin, max: p.feasGeotechnicalMax,    note: 'For carport solar' }] : []),
    { label: 'Utility Interconnection Documentation',    min: p.feasInterconnectionMin, max: p.feasInterconnectionMax, note: '' },
  ];

  const totalMin = feasItems.reduce((s, i) => s + (i.min || 0), 0);
  const totalMax = feasItems.reduce((s, i) => s + (i.max || 0), 0);

  return (
    <div className="section section--next-steps">
      <div className="section-title">Further Technical Analysis Required</div>
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

        <div className="info-box" style={{ marginBottom: '16px' }}>
          All feasibility studies must be completed by locally licensed and certified engineering firms. Great Circle Solar can assist in coordinating appropriate firms upon engagement. Indicative quotes below are sourced from independent third-party licensed engineering firms based on the system sizing outlined above. <strong>Final quotations will depend on actual on-site conditions</strong> following desktop review of available drawings, and may vary based on: number of points of interconnection (electrical), number of roof surfaces (structural), and presence of carport structures (geotechnical).
        </div>

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
            {feasItems.map(({ label, min, max, note }) => (
              <tr key={label}>
                <td><strong>{label}</strong></td>
                <td>{fmt(min, max)}</td>
                <td>~4 weeks</td>
                <td style={{ fontSize: '11px', color: 'var(--muted)' }}>{note}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>{fmt(totalMin, totalMax)}</strong></td>
              <td><strong>~4 weeks</strong></td>
              <td style={{ fontSize: '11px' }}>All workstreams run concurrently</td>
            </tr>
          </tbody>
        </table>

        <div className="note-box" style={{ marginTop: '14px' }}>
          <strong>Stage-Gating:</strong> To manage project risk and capital expenditure, feasibility workstreams can be sequenced rather than run simultaneously. Recommended order: <strong>Electrical → Structural → Geotechnical → Interconnection</strong>. Each stage-gate allows the project to be paused or redirected before committing to subsequent costs, should any fatal constraints be identified.
        </div>
      </div>
    </div>
  );
}
