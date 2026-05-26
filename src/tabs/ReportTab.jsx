import { useProject } from '../context/ProjectContext';
import { useCalc } from '../hooks/useCalc';
import ErrorBoundary from '../ErrorBoundary';
import ReportCover from '../report/ReportCover';
import ReportSectionOverview from '../report/ReportSectionOverview';
import ReportSectionLayout from '../report/ReportSectionLayout';
import ReportSectionGeneration from '../report/ReportSectionGeneration';
import ReportSectionSavings from '../report/ReportSectionSavings';
import ReportSectionChart from '../report/ReportSectionChart';
import ReportSectionSiteInfo from '../report/ReportSectionSiteInfo';
import ReportSectionMarketContext from '../report/ReportSectionMarketContext';
import ReportDisclaimer from '../report/ReportDisclaimer';
import ReportFooter from '../report/ReportFooter';
import '../report/report.css';

export default function ReportTab() {
  const { state, dispatch } = useProject();
  const { project: p } = state;
  const { result: calc, error: calcError } = useCalc(p);

  if (!calc) {
    return (
      <div className="report-error" role="alert">
        <h3>Unable to generate report</h3>
        <p>Check that all required fields are filled in and the monthly % sums to 100.</p>
        {calcError && <div className="report-error-detail">{calcError}</div>}
        <button
          className="report-error-back"
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'inputs' })}
        >
          ← Back to Inputs
        </button>
      </div>
    );
  }

  const reportFallback = err => (
    <div className="report-error" role="alert">
      <h3>Something went wrong rendering the report</h3>
      <p>An unexpected error occurred. Try going back and checking your inputs.</p>
      {err && <div className="report-error-detail">{err.message}</div>}
      <button
        className="report-error-back"
        onClick={() => dispatch({ type: 'SET_TAB', tab: 'inputs' })}
      >
        ← Back to Inputs
      </button>
    </div>
  );

  return (
    <>
      <div className="report-toolbar no-print">
        <button
          className="report-btn report-btn--outline"
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'inputs' })}
        >
          ← Back to Inputs
        </button>
        <button
          className="report-btn report-btn--primary"
          onClick={() => window.print()}
        >
          Print / Save PDF
        </button>
      </div>

      <ErrorBoundary fallback={reportFallback}>
        {p.showCoverSection && <ReportCover p={p} />}
        <div className="container">
          {(p.showSystemSection || p.showRoofSection) && <ReportSectionOverview p={p} calc={calc} />}
          {p.showLayoutSection && <ReportSectionLayout p={p} calc={calc} />}
          {(p.showGenerationSection || p.showEmissionsSection) && <ReportSectionGeneration p={p} calc={calc} />}
          {(p.showPPATermsSection || p.showRECsSection || p.showWAIRESection) && <ReportSectionSavings p={p} calc={calc} />}
          {p.showPPATermsSection && <ReportSectionChart p={p} calc={calc} />}
          {p.showSiteInfoSection && <ReportSectionSiteInfo p={p} />}
          {p.showMarketContextSection && <ReportSectionMarketContext p={p} />}
          {p.showDisclaimerSection && <ReportDisclaimer p={p} />}
        </div>
        <ReportFooter p={p} />
      </ErrorBoundary>
    </>
  );
}
