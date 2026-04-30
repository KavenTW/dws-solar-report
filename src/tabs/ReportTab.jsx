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
  const calc = useCalc(p);

  if (!calc) {
    return (
      <div style={{ padding: '40px', color: '#dc2626', fontFamily: 'monospace' }}>
        Error computing report — check that all required fields are filled and monthly % sums to 100.
      </div>
    );
  }

  return (
    <>
      <div className="no-print" style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '10px 24px', display: 'flex', gap: '12px', alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <button
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'inputs' })}
          style={{ padding: '7px 16px', background: '#fff', border: '1px solid #005FAB', borderRadius: '6px', color: '#005FAB', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
        >
          ← Back to Inputs
        </button>
        <button
          onClick={() => window.print()}
          style={{ padding: '7px 16px', background: '#005FAB', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
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
