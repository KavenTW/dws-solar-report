import ReportCover from './ReportCover';
import ReportSectionOverview from './ReportSectionOverview';
import ReportSectionLayout from './ReportSectionLayout';
import ReportSectionGeneration from './ReportSectionGeneration';
import ReportSectionSavings from './ReportSectionSavings';
import ReportSectionChart from './ReportSectionChart';
import ReportSectionMarketContext from './ReportSectionMarketContext';
import ReportSectionNextSteps from './ReportSectionNextSteps';
import ReportDisclaimer from './ReportDisclaimer';

/**
 * Full report body for one project — every section behind its visibility flag.
 * Shared by ReportTab (standalone) and PortfolioTab (embedded).
 *
 * `embedded` (portfolio compilation):
 *  - the full cover is replaced by a slim asset header band;
 *  - Next Steps renders only the asset-specific cost estimates (the generic
 *    analysis categories, stage-gating, and disclaimer appear once at
 *    document level instead of repeating per asset).
 */
export default function ReportDocument({ p, calc, embedded = false }) {
  return (
    <>
      {!embedded && p.showCoverSection && <ReportCover p={p} />}
      <div className="container">
        {embedded && (
          <div className="asset-band">
            <div>
              <div className="asset-band-name">{p.projectName || p.address}</div>
              <div className="asset-band-sub">
                {[p.siteBuildingType, [p.address, p.city].filter(Boolean).join(', ')].filter(Boolean).join(' · ')}
              </div>
            </div>
            <div className="asset-band-type">{p.reportType}</div>
          </div>
        )}
        {(p.showSystemSection || p.showRoofSection) && <ReportSectionOverview p={p} calc={calc} />}
        {p.showLayoutSection && <ReportSectionLayout p={p} calc={calc} />}
        {(p.showGenerationSection || p.showEmissionsSection) && <ReportSectionGeneration p={p} calc={calc} />}
        {(p.showPPATermsSection || p.showRECsSection || p.showWAIRESection) && <ReportSectionSavings p={p} calc={calc} />}
        {p.showPPATermsSection && <ReportSectionChart p={p} calc={calc} />}
        {p.showMarketContextSection && <ReportSectionMarketContext p={p} />}
        {p.showNextStepsSection && <ReportSectionNextSteps p={p} embedded={embedded} />}
        {!embedded && p.showDisclaimerSection && <ReportDisclaimer p={p} />}
      </div>
    </>
  );
}
