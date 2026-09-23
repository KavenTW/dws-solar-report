import { STATE_ORDER } from '../../constants/portfolioDefaults';
import PortfolioGeneration from './PortfolioGeneration';

const AVG_HOME_KWH_YR = 10632; // U.S. EIA average annual household consumption

/**
 * Executive summary: editable narrative, KPI strip and portfolio-wide
 * generation and emissions — figures computed live from the included projects
 * so headline numbers always match the body reports.
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

      <PortfolioGeneration projects={projects} />

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

/**
 * The group table plus rationale — the decision layer of the document. Renders
 * beneath the Portfolio Asset Summary on the same page, which is where the
 * group membership it refers to is shown.
 */
export function PortfolioPrioritisation({ pf }) {
  return (
    <div className="section" id="prioritisation">
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
                Asset Summary directly above. */}
            {pf.tiers.map((tier, i) => (
              <tr key={i}>
                <td><strong>{tier.name}</strong></td>
                <td>{tier.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* States the two-layer method, so a reader can reconstruct why any
            given asset sits where it does from the state page alone. */}
        <div className="footnote" style={{ marginTop: '6px' }}>
          Each state is assigned a base group reflecting its market framework; individual assets fall below that base where site-specific factors warrant. Directional proposal reflecting deployment potential and site readiness; to be confirmed with DWS before stage-one studies are commissioned.
        </div>
      </div>
    </div>
  );
}
