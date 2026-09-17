import { STATE_ORDER } from '../../constants/portfolioDefaults';
import AssetSummaryTable from './AssetSummaryTable';

/**
 * Portfolio Asset Summary: every included asset on one page, so the whole
 * portfolio can be compared without turning to the individual reports.
 * The table itself is shared with the state one-pagers (AssetSummaryTable),
 * so the two views cannot disagree.
 */
export default function PortfolioAssetSummary({ pf, projects }) {
  const ok = projects.filter(x => x.calc);
  const groups = STATE_ORDER
    .map(abbr => ({ key: abbr, label: pf.states[abbr].name, assets: ok.filter(x => x.p.province === abbr) }))
    .filter(g => g.assets.length > 0);

  return (
    <div className="section portfolio-page">
      <div className="section-title">Portfolio Asset Summary</div>
      <div className="card">
        <AssetSummaryTable groups={groups} tiers={pf.tiers} />
        <div className="footnote" style={{ marginTop: '8px' }}>
          Rooftop and carport capacities are the maximum buildable layouts identified at pre-feasibility and are subject to the site load and structural analysis described in Next Steps. Utilisation is the area occupied by the proposed layout as a share of the total measured area; portfolio utilisation is area-weighted. Prioritisation reflects the directional proposal set out on the preceding page. Calculation bases are set out in Methodology &amp; Basis of Estimates.
        </div>
      </div>
    </div>
  );
}
