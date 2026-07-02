import { useProject } from '../context/ProjectContext';
import { useCalc } from '../hooks/useCalc';
import ErrorBoundary from '../ErrorBoundary';
import ReportDocument from '../report/ReportDocument';
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
          onClick={() => {
            const prev = document.title;
            document.title = p.projectName || p.address || 'Solar Report';
            window.print();
            document.title = prev;
          }}
        >
          Print / Save PDF
        </button>
      </div>

      <ErrorBoundary fallback={reportFallback}>
        <ReportDocument p={p} calc={calc} />
      </ErrorBoundary>
    </>
  );
}
