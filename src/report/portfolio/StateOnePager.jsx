import { SCORECARD, STATE_ORDER } from '../../constants/portfolioDefaults';

/**
 * State market one-pager: content from the portfolio state (editable), the
 * shared six-state scorecard with the current state's column highlighted, and
 * a computed "Projects in this state" summary table.
 */
export default function StateOnePager({ abbr, state, projects }) {
  const colIdx = STATE_ORDER.indexOf(abbr);
  const ok = projects.filter(x => x.calc);
  const totalDC = ok.reduce((s, x) => s + (x.calc.totalDCkW || 0), 0);
  const totalMwh = ok.reduce((s, x) => s + (x.calc.annualMwh || 0), 0);

  const block = (title, text) => text && (
    <div className="state-block">
      <div className="state-block-title">{title}</div>
      <p className="portfolio-para" style={{ margin: 0 }}>{text}</p>
    </div>
  );

  return (
    <div className="section portfolio-page">
      <div className="state-pager-header">
        <div>
          <div className="section-title" style={{ marginBottom: '2px' }}>{state.name}</div>
          <div className="state-pager-subtitle">{state.subtitle}</div>
          <div className="state-pager-utility">Representative utility: {state.repUtility}</div>
        </div>
        <div className="state-score-badge">
          <div className="state-score-value">{state.score}</div>
          <div className="state-score-label">{state.badge}</div>
        </div>
      </div>

      <div className="card">
        {block('Project Summary', state.projectSummary)}

        <div className="state-block">
          <div className="state-block-title">
            BTM Rooftop &amp; Carport Solar Scorecard
            <span className="state-scorecard-legend">{SCORECARD.legend}</span>
          </div>
          <table className="market-table state-scorecard">
            <thead>
              <tr>
                <th>Scorecard Category</th>
                {SCORECARD.stateNames.map((n, i) => (
                  <th key={n} className={i === colIdx ? 'state-col-active' : undefined}>{n}</th>
                ))}
                <th>Weight/10</th>
              </tr>
            </thead>
            <tbody>
              {SCORECARD.rows.map(row => (
                <tr key={row.category}>
                  <td>{row.category}</td>
                  {row.scores.map((s, i) => (
                    <td key={i} className={`num ${i === colIdx ? 'state-col-active' : ''}`}>{s}</td>
                  ))}
                  <td className="num">{row.weight}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td><strong>Weighted Score /3</strong></td>
                {SCORECARD.weighted.map((s, i) => (
                  <td key={i} className={`num ${i === colIdx ? 'state-col-active' : ''}`}><strong>{s}</strong></td>
                ))}
                <td />
              </tr>
            </tbody>
          </table>
          <div className="footnote" style={{ marginTop: '6px' }}>{SCORECARD.footnote}</div>
        </div>

        {block('Market Position', state.marketPosition)}
        {block('Utility Billing and Avoided Value', state.utilityBilling)}
        {block('State-Led REC Program', state.recProgram)}
        {block('Development Considerations', state.devConsiderations)}

        <div className="state-block">
          <div className="state-block-title">Projects in {state.name}</div>
          <p className="portfolio-para" style={{ marginTop: 0 }}>
            {ok.length} asset{ok.length !== 1 ? 's' : ''} in this portfolio {ok.length !== 1 ? 'are' : 'is'} located in {state.name}, representing a combined maximum potential capacity of {Math.round(totalDC).toLocaleString()} kW DC and estimated Year-1 generation of {Math.round(totalMwh).toLocaleString()} MWh.
            {state.projectsIntro ? ` ${state.projectsIntro}` : ''}
          </p>
          <table className="market-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>City</th>
                <th className="num">kW DC</th>
                <th className="num">Yr-1 MWh</th>
                <th className="num">Footprint ft²</th>
                <th className="num">Points of Interconnection</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(({ entry, p, calc, err }) => (
                <tr key={entry.id}>
                  <td>{p.projectName || entry.name}</td>
                  <td>{(p.city || '').split(',')[0]}</td>
                  <td className="num">{calc ? Math.round(calc.totalDCkW).toLocaleString() : '—'}</td>
                  <td className="num">{calc ? Math.round(calc.annualMwh).toLocaleString() : '—'}</td>
                  <td className="num">{((p.rooftopAreaUsedSqFt || 0) + (p.carportAreaUsedSqFt || 0)).toLocaleString()}</td>
                  <td className="num">{err ? 'error' : Math.max(1, Math.round(p.pointsOfInterconnection || 1))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footnote" style={{ marginTop: '10px' }}>{state.screeningNote}</div>
      </div>
    </div>
  );
}
