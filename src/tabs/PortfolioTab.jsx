import { useMemo, useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { usePortfolio } from '../hooks/usePortfolio';
import { loadAllProjects } from '../utils/storage';
import { DEFAULT_PROJECT } from '../constants/defaults';
import { STATE_ORDER } from '../constants/portfolioDefaults';
import { computeCalc } from '../utils/calculations';
import ErrorBoundary from '../ErrorBoundary';
import ReportDocument from '../report/ReportDocument';
import PortfolioTitlePage from '../report/portfolio/PortfolioTitlePage';
import PortfolioExecSummary from '../report/portfolio/PortfolioExecSummary';
import PortfolioTOC from '../report/portfolio/PortfolioTOC';
import StateOnePager from '../report/portfolio/StateOnePager';
import PortfolioNextSteps from '../report/portfolio/PortfolioNextSteps';
import '../report/report.css';
import '../styles/form.css';

const STATE_EDIT_FIELDS = [
  ['projectSummary', 'Project Summary'],
  ['marketPosition', 'Market Position'],
  ['utilityBilling', 'Utility Billing and Avoided Value'],
  ['recProgram', 'State-Led REC Program'],
  ['devConsiderations', 'Development Considerations'],
  ['projectsIntro', 'Projects intro — extra sentence(s) after the computed summary line'],
];

export default function PortfolioTab() {
  const { dispatch } = useProject();
  const { pf, set, setStateField, setTocPage, toggleProject } = usePortfolio();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorState, setEditorState] = useState('CA');

  const saved = useMemo(() => loadAllProjects(), []);

  const projects = useMemo(() => {
    return saved
      .filter(e => !pf.excludedProjects.includes(e.name))
      .map(e => {
        const p = { ...DEFAULT_PROJECT, ...e.data };
        let calc = null, err = null;
        try { calc = computeCalc(p); } catch (ex) { err = ex.message; }
        return { entry: e, p, calc, err };
      });
  }, [saved, pf.excludedProjects]);

  const byState = useMemo(() => {
    const map = {};
    for (const abbr of STATE_ORDER) map[abbr] = projects.filter(x => x.p.province === abbr);
    return map;
  }, [projects]);

  const activeStates = STATE_ORDER.filter(abbr => byState[abbr].length > 0);

  const tocEntries = useMemo(() => {
    const rows = [{ slug: 'exec-summary', label: 'Executive Summary', level: 0 }];
    for (const abbr of activeStates) {
      rows.push({ slug: `state-${abbr}`, label: `${pf.states[abbr].name} — Market One-Pager`, level: 0 });
      for (const { entry, p } of byState[abbr]) {
        rows.push({ slug: `project-${entry.id}`, label: p.projectName || entry.name, level: 1 });
      }
    }
    rows.push({ slug: 'next-steps', label: 'Next Steps', level: 0 });
    return rows;
  }, [activeStates, byState, pf.states]);

  const handlePrint = () => {
    const prev = document.title;
    document.title = pf.title || 'Portfolio Report';
    window.print();
    document.title = prev;
  };

  const txt = (label, value, onChange, rows = 3) => (
    <label className="portfolio-editor-field">
      <span>{label}</span>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} />
    </label>
  );

  const line = (label, value, onChange) => (
    <label className="portfolio-editor-field">
      <span>{label}</span>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} />
    </label>
  );

  return (
    <>
      <div className="report-toolbar no-print">
        <button className="report-btn report-btn--outline" onClick={() => dispatch({ type: 'SET_TAB', tab: 'inputs' })}>
          ← Back to Inputs
        </button>
        <button className="report-btn report-btn--outline" onClick={() => setEditorOpen(o => !o)}>
          {editorOpen ? 'Close Editor' : 'Edit Portfolio Content'}
        </button>
        <button className="report-btn report-btn--primary" onClick={handlePrint}>
          Print / Save PDF
        </button>
      </div>

      {editorOpen && (
        <div className="portfolio-editor no-print">
          <div className="portfolio-editor-grid">
            <div className="portfolio-editor-col">
              <div className="portfolio-editor-heading">Title Page</div>
              {line('Title', pf.title, v => set('title', v))}
              {line('Subtitle', pf.subtitle, v => set('subtitle', v))}
              {line('Report type line', pf.reportMeta, v => set('reportMeta', v))}
              {line('Prepared for', pf.preparedFor, v => set('preparedFor', v))}
              {line('Prepared by', pf.preparedBy, v => set('preparedBy', v))}
              {line('Date', pf.reportDate, v => set('reportDate', v))}

              <div className="portfolio-editor-heading">Executive Summary</div>
              {txt('Narrative (blank line = new paragraph)', pf.execSummary, v => set('execSummary', v), 8)}

              <div className="portfolio-editor-heading">Next Steps</div>
              {txt('Narrative (blank line = new paragraph)', pf.nextSteps, v => set('nextSteps', v), 8)}

              <div className="portfolio-editor-heading">Included Reports</div>
              <div className="portfolio-editor-projects">
                {saved.map(e => (
                  <label key={e.id}>
                    <input
                      type="checkbox"
                      checked={!pf.excludedProjects.includes(e.name)}
                      onChange={() => toggleProject(e.name)}
                    />
                    {e.name}
                  </label>
                ))}
                {saved.length === 0 && <p className="footnote">No saved projects found — save projects from the Inputs tab first.</p>}
              </div>
            </div>

            <div className="portfolio-editor-col">
              <div className="portfolio-editor-heading">
                State One-Pagers
                <select value={editorState} onChange={e => setEditorState(e.target.value)} style={{ marginLeft: '10px' }}>
                  {STATE_ORDER.map(abbr => (
                    <option key={abbr} value={abbr}>{pf.states[abbr].name}</option>
                  ))}
                </select>
              </div>
              {line('Representative utility', pf.states[editorState].repUtility, v => setStateField(editorState, 'repUtility', v))}
              {line('Badge', pf.states[editorState].badge, v => setStateField(editorState, 'badge', v))}
              {STATE_EDIT_FIELDS.map(([key, label]) =>
                <span key={key}>{txt(label, pf.states[editorState][key], v => setStateField(editorState, key, v), 4)}</span>
              )}
              {txt('Screening note', pf.states[editorState].screeningNote, v => setStateField(editorState, 'screeningNote', v), 2)}
            </div>
          </div>
        </div>
      )}

      <ErrorBoundary fallback={err => (
        <div className="report-error" role="alert">
          <h3>Something went wrong rendering the portfolio</h3>
          {err && <div className="report-error-detail">{err.message}</div>}
        </div>
      )}>
        <div className="portfolio-doc">
          <PortfolioTitlePage pf={pf} />
          <div className="container">
            <PortfolioExecSummary pf={pf} projects={projects} />
            <PortfolioTOC pf={pf} entries={tocEntries} setTocPage={setTocPage} />
          </div>
          {activeStates.map(abbr => (
            <div key={abbr}>
              <div className="container">
                <StateOnePager abbr={abbr} state={pf.states[abbr]} projects={byState[abbr]} />
              </div>
              {byState[abbr].map(({ entry, p, calc, err }) => (
                <div key={entry.id} className="portfolio-report">
                  {calc ? (
                    <ReportDocument p={p} calc={calc} />
                  ) : (
                    <div className="container">
                      <div className="report-error" role="alert">
                        <h3>“{entry.name}” could not be rendered</h3>
                        <p>Open it from the Inputs tab and check its fields.</p>
                        {err && <div className="report-error-detail">{err}</div>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="container">
            <PortfolioNextSteps pf={pf} />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}
