import { groupAssets } from './assetGroups';
import AssetSummaryTable from './AssetSummaryTable';

/**
 * Portfolio Asset Summary: every included asset on one page, so the whole
 * portfolio can be compared without turning to the individual reports.
 * The table itself is shared with the state one-pagers (AssetSummaryTable),
 * so the two views cannot disagree.
 */
export default function PortfolioAssetSummary({ pf, projects }) {
  const ok = projects.filter(x => x.calc);
  const groups = groupAssets(ok, pf.tiers);

  return (
    <div className="section portfolio-page" id="asset-summary">
      <div className="section-title">Portfolio Asset Summary</div>
      <div className="card">
        <AssetSummaryTable groups={groups} tiers={pf.tiers} />
        <div className="footnote" style={{ marginTop: '8px' }}>
          Rooftop and carport capacities are the maximum buildable layouts identified at pre-feasibility and are subject to the site load and structural analysis described in Next Steps. Avoided emissions apply the applicable regional grid emissions factor and include module degradation over the term. Grouping follows the proposed prioritization set out on the following page. Calculation bases are set out in Methodology &amp; Basis of Estimates.
        </div>
      </div>
    </div>
  );
}
