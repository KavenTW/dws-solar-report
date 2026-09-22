import { groupAssets } from './assetGroups';
import AssetSummaryTable from './AssetSummaryTable';

/**
 * Portfolio Asset Summary: every included asset on one page, so the whole
 * portfolio can be compared without turning to the individual reports.
 * The table itself is shared with the state one-pagers (AssetSummaryTable),
 * so the two views cannot disagree.
 */
export default function PortfolioAssetSummary({ pf, projects, children }) {
  const ok = projects.filter(x => x.calc);
  const groups = groupAssets(ok, pf.tiers);

  // The page wrapper is not itself a `.section`: the prioritization table
  // renders beneath as a sibling, keeping its own break-inside guard.
  return (
    <div className="portfolio-page" id="asset-summary">
      <div className="section">
        <div className="section-title">Portfolio Asset Summary</div>
        <div className="card">
          {/* State only here: the one-pagers are already a single state. */}
          <AssetSummaryTable groups={groups} tiers={pf.tiers} showState />
          <div className="footnote" style={{ marginTop: '8px' }}>
            Rooftop and carport capacities are the maximum buildable layouts identified at pre-feasibility and are subject to the site load and structural analysis described in Next Steps. Avoided emissions apply the applicable regional grid emissions factor and include module degradation over the term. Grouping follows the proposed prioritization set out below. Calculation bases are set out in Methodology &amp; Basis of Estimates.
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
