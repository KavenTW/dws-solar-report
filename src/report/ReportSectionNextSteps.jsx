import { TECHNICAL_ITEMS } from '../constants/technicalItems';

// "Issues for Further Consideration" bullets — apply to every asset.
const FURTHER_CONSIDERATION = [
  'Detailed analysis of on-site electrical load is required to inform final system sizing.',
];

function fmt(min, max) {
  if (min == null && max == null) return '';
  const f = v => '$' + v.toLocaleString();
  return min === max ? f(min) : `${f(min)} – ${f(max)}`;
}

/**
 * Standalone report: full section — analysis categories, additional notes,
 * cost estimates, and the stage-gating callout.
 *
 * `embedded` (portfolio): only the asset-specific content — additional notes
 * and the indicative cost table. The generic categories, stage-gating, and
 * disclaimer render once at document level instead of repeating per asset.
 */
export default function ReportSectionNextSteps({ p, embedded = false, titleSuffix }) {
  const hasCarport = (p.carportSizeDCkW || 0) > 0 || (p.carportAreaUsedSqFt || 0) > 0;
  const points = Math.max(1, Math.round(p.pointsOfInterconnection || 1));

  const feasItems = [
    { label: 'GCS Pre-Feasibility',                      min: null,                     max: null,                     note: '' },
    { label: 'Structural Feasibility (3rd Party)',       min: p.feasStructuralMin,      max: p.feasStructuralMax,      note: 'Cost relates to number of roof structures' },
    ...(hasCarport ? [{ label: 'Geotechnical Feasibility (3rd Party)', min: p.feasGeotechnicalMin, max: p.feasGeotechnicalMax, note: 'For carport solar' }] : []),
    ...(p.glareStudyRequired ? [{ label: 'Glare Study (3rd Party)', min: p.feasGlareMin, max: p.feasGlareMax, note: 'If required' }] : []),
    { label: 'Electrical Feasibility (3rd Party)',       min: p.feasElectricalMin * points, max: p.feasElectricalMax * points, note: `${points} point${points !== 1 ? 's' : ''} of interconnection × ${fmt(p.feasElectricalMin, p.feasElectricalMax)}/point. Review of metering infrastructure and on-site load analysis is required to confirm which meters to proceed with, prior to commissioning electrical feasibility.` },
    { label: 'Preparation of Interconnection Documentation (3rd Party)', min: p.feasInterconnectionMin, max: p.feasInterconnectionMax, note: '' },
  ];

  const totalMin = feasItems.reduce((s, i) => s + (i.min || 0), 0);
  const totalMax = feasItems.reduce((s, i) => s + (i.max || 0), 0);

  // Roof vintage leads the site-specific list: it gates when works can happen,
  // so an unknown year is stated rather than left silent.
  // A replacement field holding prose rather than a year (e.g. a building due
  // for demolition) replaces the roof-age line entirely — quoting a roof year
  // for a building that is coming down would read as a contradiction.
  // A replacement year still to come is stated as tentative and appended, so a
  // forward-dated roof is never lost behind the last replacement — it is what
  // decides whether an array can be built now or should wait for the works.
  const replacementIsProse = p.roofReplacementYear && !/^\s*\d{4}\s*$/.test(p.roofReplacementYear);
  const replacementYear = replacementIsProse ? null : (p.roofReplacementYear || '').trim();
  const pastNote = p.roofInstallYear
    ? `Most recent roof replacement ${p.roofInstallYear}`
    : 'Most recent roof replacement year to be confirmed';
  const roofNote = replacementIsProse
    ? p.roofReplacementYear
    : replacementYear
      ? `${pastNote}; tentative roof replacement year ${replacementYear}.`
      : `${pastNote}.`;

  const siteNotes = [roofNote, ...(p.additionalNotes || '').split('\n').filter(Boolean)];

  const additionalNotes = (
    <div style={{ marginTop: embedded ? '0' : '24px', marginBottom: embedded ? '16px' : '0' }}>
      <div className="card-title" style={{ marginBottom: '10px' }}>{embedded ? 'Site-Specific Considerations' : 'Additional Notes'}</div>
      <ul style={{ paddingLeft: '20px', margin: 0 }}>
        {siteNotes.map((line, i) => (
          <li key={i} style={{ marginBottom: '6px' }}>{line}</li>
        ))}
      </ul>
    </div>
  );

  // Renders immediately before the feasibility cost estimates in both the
  // standalone and the compiled report. Site-specific points belong in
  // Site-Specific Considerations (p.additionalNotes), not here — these apply
  // to every asset.
  const considerationSection = (
    <div className="section">
      <div className="section-title">Issues for Further Consideration{titleSuffix ? ` — ${titleSuffix}` : ''}</div>
      <div className="card">
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {FURTHER_CONSIDERATION.map((line, i) => (
            <li key={i} style={{ marginBottom: '6px' }}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const costCard = (
    <div className="card" style={embedded ? undefined : { marginTop: '16px', breakBefore: 'avoid', pageBreakBefore: 'avoid' }}>
      {embedded && additionalNotes}
      {!embedded && <div className="card-title">Indicative Feasibility Cost Estimates</div>}

      <table className="fin-table feas-table" style={{ width: '100%' }}>
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
                <td style={{ fontSize: '12px', color: 'var(--muted)' }}>{note}</td>
              </tr>
            );
          })}
          <tr className="total-row">
            <td><strong>Total</strong></td>
            <td><strong>{fmt(totalMin, totalMax)}</strong></td>
            <td><strong>~4 weeks</strong></td>
            <td style={{ fontSize: '12px' }}>All workstreams run concurrently, per site</td>
          </tr>
        </tbody>
      </table>

      {embedded ? (
        <div className="footnote" style={{ marginTop: '10px' }}>
          Note: Feasibility costs are provided as requested by DWS. Indicative quotes from independent licensed engineering firms; calculation bases and cost drivers are set out in Methodology &amp; Basis of Estimates.
        </div>
      ) : (
        <div className="footnote" style={{ marginTop: '10px' }}>
          Note: Feasibility costs are provided as requested by DWS. All feasibility studies must be completed by locally licensed and certified engineering firms. Quotes are indicative, sourced from independent third-party firms based on system sizing above. Final quotations depend on actual on-site conditions. Cost drivers: points of interconnection (electrical), number of roof structures (structural){hasCarport ? ', presence of carport structures (geotechnical)' : ''}.
        </div>
      )}
      <div className="footnote" style={{ marginTop: '4px' }}>
        Following submission, utility interconnection review timelines are utility-specific and typically require approximately 3–6 months.
      </div>

      {!embedded && (
        <div className="stage-gate-box" style={{ marginTop: '14px' }}>
          <div className="stage-gate-title">A flexible, stage-gated approach</div>
          <p className="stage-gate-intro">
            Building on our completed pre-feasibility, the remaining studies can be sequenced rather than run at once — each gate lets the project proceed, pause, or redirect before further cost is committed.
          </p>
          <div className="stage-gate-steps">
            <span className="stage-gate-step">Electrical Load Analysis</span>
            <span className="stage-gate-arrow">→</span>
            <span className="stage-gate-step">Structural</span>
            <span className="stage-gate-arrow">→</span>
            {hasCarport && <><span className="stage-gate-step">Geotechnical</span><span className="stage-gate-arrow">→</span></>}
            <span className="stage-gate-step">Electrical</span>
            <span className="stage-gate-arrow">→</span>
            <span className="stage-gate-step">Interconnection</span>
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <>
        {considerationSection}
        <div className="section section--next-steps">
          <div className="section-title">Indicative Feasibility Cost Estimates{titleSuffix ? ` — ${titleSuffix}` : ''}</div>
          {costCard}
        </div>
      </>
    );
  }

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
        {additionalNotes}
      </div>
      {considerationSection}
      {costCard}
    </div>
  );
}
