import AssetSummaryTable from './AssetSummaryTable';

/**
 * State market one-pager: editable narrative bullets for the state, followed
 * by the asset summary table for the assets located there and a pointer to
 * that state's appendix.
 */
export default function StateOnePager({ abbr, state, projects, tiers, appendixLetter }) {
  const ok = projects.filter(x => x.calc);
  const totalDC = ok.reduce((s, x) => s + (x.calc.totalDCkW || 0), 0);
  const totalMwh = ok.reduce((s, x) => s + (x.calc.annualMwh || 0), 0);

  // One-pager narrative is written as short bullets — one per line in the
  // editable field. Legacy paragraph text still renders, as a single bullet.
  const block = (title, text) => text && (
    <div className="state-block">
      <div className="state-block-title">{title}</div>
      <ul className="state-bullets">
        {text.split('\n').map(s => s.trim()).filter(Boolean).map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
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
      </div>

      <div className="card">
        <div className="state-text-cols">
          {block('Project Summary', state.projectSummary)}
          {block('Market Position', state.marketPosition)}
          {block('Utility Billing and Avoided Value', state.utilityBilling)}
          {block('State-Led REC Program', state.recProgram)}
          {block('Development Considerations', state.devConsiderations)}
        </div>

        <div className="state-block">
          <div className="state-block-title">Projects in {state.name}</div>
          <p className="portfolio-para" style={{ marginTop: 0 }}>
            {ok.length} asset{ok.length !== 1 ? 's' : ''} in this portfolio {ok.length !== 1 ? 'are' : 'is'} located in {state.name}, representing a combined maximum potential capacity of {Math.round(totalDC).toLocaleString()} kW DC and estimated Year-1 generation of {Math.round(totalMwh).toLocaleString()} MWh.
            {state.projectsIntro ? ` ${state.projectsIntro}` : ''}
          </p>
          <AssetSummaryTable
            groups={[{ key: abbr, label: state.name, assets: ok }]}
            tiers={tiers}
            showGroupLabels={false}
            showTotals={ok.length > 1}
          />
          {appendixLetter && (
            <p className="portfolio-para appendix-pointer">
              Further detail on each asset is provided in <strong>Appendix {appendixLetter}</strong>.
            </p>
          )}
        </div>

        <div className="footnote" style={{ marginTop: '10px' }}>{state.screeningNote}</div>
      </div>
    </div>
  );
}
