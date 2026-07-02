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
 * Shared by ReportTab (single active project) and PortfolioTab (one per saved
 * project) so the compiled portfolio is formatted identically to a standalone
 * report.
 */
export default function ReportDocument({ p, calc }) {
  return (
    <>
      {p.showCoverSection && <ReportCover p={p} />}
      <div className="container">
        {(p.showSystemSection || p.showRoofSection) && <ReportSectionOverview p={p} calc={calc} />}
        {p.showLayoutSection && <ReportSectionLayout p={p} calc={calc} />}
        {(p.showGenerationSection || p.showEmissionsSection) && <ReportSectionGeneration p={p} calc={calc} />}
        {(p.showPPATermsSection || p.showRECsSection || p.showWAIRESection) && <ReportSectionSavings p={p} calc={calc} />}
        {p.showPPATermsSection && <ReportSectionChart p={p} calc={calc} />}
        {p.showMarketContextSection && <ReportSectionMarketContext p={p} />}
        {p.showNextStepsSection && <ReportSectionNextSteps p={p} />}
        {p.showDisclaimerSection && <ReportDisclaimer p={p} />}
      </div>
    </>
  );
}
