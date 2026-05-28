const TECHNICAL_ITEMS = [
  { category: 'Electrical',             notes: 'Confirm on-site electrical infrastructure and limitations' },
  { category: 'Structural',             notes: 'Confirm structural capacity availability and limitations' },
  { category: 'Roof',                   notes: 'Evaluate roof conditions including age, type, and condition' },
  { category: 'Geotechnical',           notes: 'Perform any relevant geotechnical assessments, particularly for carport structures' },
  { category: 'Site Plan Constraints',  notes: 'Evaluate any limitations imposed by applicable site/civil/zoning plans' },
  { category: 'System Design',          notes: 'Develop comprehensive final system design given site specifications' },
  { category: 'Utility Interconnection',notes: 'Coordinate with qualified electrical engineer to develop single-line diagrams required for utility interconnection. Prepare, submit, and manage utility interconnection.' },
];

export default function ReportSectionNextSteps({ p }) {
  return (
    <div className="section">
      <div className="section-title">Further Technical Analysis Required</div>
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
  );
}
