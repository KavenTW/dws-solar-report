import { STATE_ORDER } from '../../constants/portfolioDefaults';
import { groupAssets } from './assetGroups';
import PortfolioCapacityChart from './PortfolioCapacityChart';

const AVG_HOME_KWH_YR = 10632; // U.S. EIA average annual household consumption

/**
 * Executive summary: editable narrative + KPI strip, capacity chart, and the
 * proposed prioritisation table — figures computed live from the included
 * projects so headline numbers always match the body reports.
 */
export default function PortfolioExecSummary({ pf, projects }) {
  const ok = projects.filter(x => x.calc);
  // Rounded per asset before summing, matching the Portfolio Asset Summary
  // total row — the KPI strip and that table must state the same number.
  const totalDC = ok.reduce((s, x) => s + Math.round(x.calc.totalDCkW || 0), 0);
  const totalMwh = ok.reduce((s, x) => s + Math.round(x.calc.annualMwh || 0), 0);
  const totalLifetimeCO2e = ok.reduce((s, x) => s + (x.calc.lifetimeCO2e || 0), 0);
  const stateCount = new Set(ok.map(x => x.p.province)).size;
  const equivHomes = Math.round((totalMwh * 1000) / AVG_HOME_KWH_YR);

  // "California (5), Nevada (1), …" in the document's state order.
  const stateBreakdown = STATE_ORDER
    .map(abbr => ({ name: pf.states[abbr]?.name, n: ok.filter(x => x.p.province === abbr).length }))
    .filter(s => s.n > 0 && s.name)
    .map(s => `${s.name} (${s.n})`)
    .join(', ')
    .replace(/, ([^,]*)$/, ' and $1');

  // Capacity is shown by prioritization group, matching how the document
  // presents the portfolio everywhere else.
  const chartStates = groupAssets(ok, pf.tiers)
    .map(g => ({
      abbr: g.key,
      name: g.shortLabel,
      rooftopDC: g.assets.reduce((s, x) => s + (x.p.rooftopSizeDCkW || 0), 0),
      carportDC: g.assets.reduce((s, x) => s + (x.p.carportSizeDCkW || 0), 0),
    }))
    .filter(g => g.rooftopDC + g.carportDC > 0);

  return (
    <div className="section portfolio-page" id="exec-summary">
      <div className="section-title">Executive Summary</div>
      <div className="kpi-grid" style={{ marginBottom: '16px' }}>
        <div className="kpi-card">
          <div className="kpi-label">Sites Reviewed</div>
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
          <div className="kpi-unit">≈ {equivHomes.toLocaleString()} U.S. homes&rsquo; annual use**</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Est. Lifetime Carbon Abatement</div>
          <div className="kpi-value">{(Math.round(totalLifetimeCO2e / 100) * 100).toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>t CO₂e</span></div>
          <div className="kpi-unit">all sites combined, over term**</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-title">Maximum Potential Capacity by Prioritization Group (kW DC)</div>
        {/* Height follows the bar count: horizontal bars need room per row. */}
        <div className="capacity-chart-wrap" style={{ height: `${Math.max(120, chartStates.length * 46 + 34)}px` }}>
          <PortfolioCapacityChart states={chartStates} />
        </div>
        <div className="chart-legend">
          <span className="chart-legend-item"><span className="chart-legend-swatch chart-legend-swatch--rooftop" />Rooftop</span>
          <span className="chart-legend-item"><span className="chart-legend-swatch chart-legend-swatch--carport" />Carport</span>
        </div>
      </div>

      <div className="card">
        {/* Computed from the included assets rather than seeded, so the site
            count and the state breakdown can never drift from the data. */}
        <p className="portfolio-para" style={{ marginTop: 0 }}>
          <strong>{ok.length} site{ok.length !== 1 ? 's' : ''}</strong> were provided for assessment, located across {stateCount} state{stateCount !== 1 ? 's' : ''}: {stateBreakdown}. Each site was assessed for its maximum rooftop and carport solar deployment potential, together with the site constraints that would need to be addressed before a project could advance; no site was excluded from the assessment.
        </p>
        {pf.execSummary.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className="portfolio-para">{para}</p>
        ))}
        <div className="footnote" style={{ marginTop: '8px' }}>
          ** Calculation bases and sources are set out in Methodology &amp; Basis of Estimates.
        </div>
      </div>
    </div>
  );
}

/** Own page: the tier table plus rationale — decision layer of the document. */
export function PortfolioPrioritisation({ pf }) {
  return (
    <div className="section portfolio-page" id="prioritisation">
      <div className="section-title">Proposed Asset Prioritization</div>
      <div className="card">
        <table className="market-table">
          <thead>
            <tr>
              <th style={{ width: '26%' }}>Group</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            {/* `tier.assets` still drives the grouping everywhere else; it is
                simply not printed here. Membership is shown by the Portfolio
                Asset Summary on the preceding page. */}
            {pf.tiers.map((tier, i) => (
              <tr key={i}>
                <td><strong>{tier.name}</strong></td>
                <td>{tier.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footnote" style={{ marginTop: '6px' }}>
          Directional proposal reflecting deployment potential and site readiness; to be confirmed with DWS before stage-one studies are commissioned.
        </div>
      </div>
    </div>
  );
}
