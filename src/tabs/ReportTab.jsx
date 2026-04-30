import { useProject } from '../context/ProjectContext';
import { useCalc } from '../hooks/useCalc';
import ReportCover from '../report/ReportCover';
import ReportSectionOverview from '../report/ReportSectionOverview';
import ReportSectionLayout from '../report/ReportSectionLayout';
import ReportSectionGeneration from '../report/ReportSectionGeneration';
import ReportSectionSavings from '../report/ReportSectionSavings';
import ReportSectionChart from '../report/ReportSectionChart';
import ReportSectionSiteInfo from '../report/ReportSectionSiteInfo';
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

      <ReportCover p={p} />
      <div className="container">
        <ReportSectionOverview p={p} calc={calc} />
        <ReportSectionLayout p={p} calc={calc} />
        <ReportSectionGeneration p={p} calc={calc} />
        <ReportSectionSavings p={p} calc={calc} />
        <ReportSectionChart p={p} calc={calc} />
        <ReportSectionSiteInfo p={p} />
        <ReportDisclaimer p={p} />
      </div>
      <ReportFooter p={p} />
    </>
  );
}
