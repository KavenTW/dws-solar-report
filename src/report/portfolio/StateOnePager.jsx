import AssetSummaryTable from './AssetSummaryTable';
import { normalize, buildGroupLookup } from './assetGroups';

/**
 * State market one-pager: editable narrative bullets for the state, followed
 * by the asset summary table for the assets located there and a pointer to
 * that state's appendix.
 */
export default function StateOnePager({ abbr, state, projects, tiers, appendixLetter }) {
  const ok = projects.filter(x => x.calc);
  // Rounded per asset before summing, so the intro sentence states the same
  // figure as the total row of the table directly beneath it.
  const totalDC = ok.reduce((s, x) => s + Math.round(x.calc.totalDCkW || 0), 0);
  const totalMwh = ok.reduce((s, x) => s + Math.round(x.calc.annualMwh || 0), 0);

  // One-pager narrative is written as short bullets — one per line in the
  // editable field. Legacy paragraph text still renders, as a single bullet.
  // Why each asset in this state sits in the group it does. Written one asset
  // per line as "Asset Name | rationale"; an asset with no line still gets a
  // row, so a missing explanation is visible rather than silently absent.
  const rationaleOf = new Map(
    (state.groupingRationale || '').split('\n').map(l => l.trim()).filter(Boolean).map(line => {
      const [name, ...rest] = line.split('|');
      return [normalize(name), rest.join('|').trim()];
    })
  );
  const tierOf = buildGroupLookup(tiers);
  const rationaleRows = ok.map(({ entry, p }) => {
    const name = p.projectName || entry.name;
    return { name, tier: tierOf.get(normalize(name)), text: rationaleOf.get(normalize(name)) || '' };
  });

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
    <div className="section portfolio-page" id={`state-${abbr}`}>
      <div className="state-pager-header">
        <div>
          {/* The page title carries the state; the old "Rooftop & Carport Solar
              Market One-Pager" subtitle said the same thing twice. */}
          <div className="section-title state-pager-title" style={{ marginBottom: '2px' }}>{state.name} Market Overview and Site Summary</div>
          <div className="state-pager-utility">Representative utility: {state.repUtility}</div>
        </div>
      </div>

      <div className="card">
        <div className="state-text-cols">
          {block('State Summary', state.projectSummary)}
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

        {rationaleRows.length > 0 && (
          <div className="state-block">
            <div className="state-block-title">Grouping Rationale</div>
            <table className="market-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>Asset</th>
                  <th style={{ width: '16%' }}>Group</th>
                  <th>Rationale</th>
                </tr>
              </thead>
              <tbody>
                {rationaleRows.map(({ name, tier, text }) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{tier || '—'}</td>
                    <td className={text ? undefined : 'muted-note'}>{text || 'To be provided'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
