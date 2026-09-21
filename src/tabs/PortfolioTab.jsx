import { useMemo, useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { usePortfolio } from '../hooks/usePortfolio';
import { loadAllProjects, applyDatasetUpdate, attachBundledLayouts } from '../utils/storage';
import { DWS_DATASET, DWS_DATASET_LABEL, DWS_PATCH_FIELDS, DWS_LAYOUT_IMAGES } from '../constants/dwsDataset';
import { compressImage } from '../utils/imageCompress';
import { DEFAULT_PROJECT } from '../constants/defaults';
import { STATE_ORDER } from '../constants/portfolioDefaults';
import { computeCalc } from '../utils/calculations';
import { estimateTocPages } from '../utils/pageEstimate';
import ErrorBoundary from '../ErrorBoundary';
import ReportDocument from '../report/ReportDocument';
import PortfolioTitlePage from '../report/portfolio/PortfolioTitlePage';
import PortfolioExecSummary, { PortfolioPrioritisation } from '../report/portfolio/PortfolioExecSummary';
import PortfolioAssetSummary from '../report/portfolio/PortfolioAssetSummary';
import PortfolioTOC from '../report/portfolio/PortfolioTOC';
import PortfolioScope from '../report/portfolio/PortfolioScope';
import PortfolioKeyConsiderations from '../report/portfolio/PortfolioKeyConsiderations';
import PortfolioSizingBasis from '../report/portfolio/PortfolioSizingBasis';
import PortfolioMethodology from '../report/portfolio/PortfolioMethodology';
import StateOnePager from '../report/portfolio/StateOnePager';
import PortfolioNextSteps from '../report/portfolio/PortfolioNextSteps';
import PortfolioDisclaimer from '../report/portfolio/PortfolioDisclaimer';
import PortfolioAppendixIndex from '../report/portfolio/PortfolioAppendixIndex';
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
  const { pf, set, setStateField, setTocPage, toggleProject, resetContent } = usePortfolio();
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

  // Individual asset reports live in the appendices — one lettered appendix per
  // state, in the same order the one-pagers appear.
  const appendixOf = useMemo(() => {
    const map = {};
    activeStates.forEach((abbr, i) => { map[abbr] = String.fromCharCode(65 + i); });
    return map;
  }, [activeStates]);

  const tocEntries = useMemo(() => {
    const rows = [
      { slug: 'scope', label: 'Scope of Engagement', level: 0 },
      { slug: 'exec-summary', label: 'Executive Summary', level: 0 },
      { slug: 'prioritisation', label: 'Proposed Asset Prioritization', level: 0 },
      { slug: 'asset-summary', label: 'Portfolio Asset Summary', level: 0 },
      { slug: 'methodology', label: 'Methodology & Basis of Estimates', level: 0 },
      { slug: 'sizing-basis', label: 'Net Metering & System Sizing', level: 1 },
      { slug: 'key-considerations', label: 'Key Considerations', level: 0 },
    ];
    for (const abbr of activeStates) {
      rows.push({ slug: `state-${abbr}`, label: `${pf.states[abbr].name} — Market One-Pager`, level: 0 });
    }
    rows.push({ slug: 'next-steps', label: 'Next Steps', level: 0 });
    rows.push({ slug: 'appendices', label: 'Appendices', level: 0 });
    for (const abbr of activeStates) {
      rows.push({
        slug: `appendix-${abbr}`,
        label: `Appendix ${appendixOf[abbr]} — ${pf.states[abbr].name}`,
        level: 0,
      });
      for (const { entry, p } of byState[abbr]) {
        rows.push({ slug: `project-${entry.id}`, label: p.projectName || entry.name, level: 1 });
      }
    }
    return rows;
  }, [activeStates, byState, pf.states, appendixOf]);

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
              <div className="portfolio-editor-heading">Maintenance</div>
              <button
                className="report-btn report-btn--primary"
                style={{ marginBottom: '8px', display: 'block' }}
                onClick={async () => {
                  if (window.confirm(`Load / update the DWS portfolio data (${DWS_DATASET_LABEL})?\n\nExisting saved projects get updated sizing, production, site notes, and any missing layout images — images you uploaded yourself and other edits are preserved. Missing projects are created.`)) {
                    const { updated, created } = applyDatasetUpdate(DWS_DATASET, DWS_PATCH_FIELDS);
                    const attached = await attachBundledLayouts(DWS_LAYOUT_IMAGES, compressImage);
                    window.alert(`Done: ${updated} project${updated !== 1 ? 's' : ''} updated, ${created} created, ${attached} layout image${attached !== 1 ? 's' : ''} attached. Reloading.`);
                    window.location.reload();
                  }
                }}
              >
                Load / update DWS data — {DWS_DATASET_LABEL}
              </button>
              <button
                className="report-btn report-btn--outline"
                style={{ marginBottom: '8px', display: 'block' }}
                onClick={() => {
                  if (!window.confirm('Estimate the table-of-contents page numbers from the current document and fill them in?\n\nThis measures the document against the printed page size. It is an estimate — check it against one test print before sending the document out. Any numbers you have already entered will be replaced.')) return;
                  const result = estimateTocPages({ 'sizing-basis': 'methodology' });
                  if (!result) { window.alert('Could not measure the document. Close the editor so the report is on screen, then try again.'); return; }
                  let filled = 0;
                  const missed = [];
                  for (const { slug, label } of tocEntries) {
                    // Asset rows fall back to the printed asset name when the
                    // saved project's id does not resolve.
                    const page = result.pages[slug] ?? result.pagesByName[label];
                    if (page != null) { setTocPage(slug, String(page)); filled++; }
                    else missed.push(label);
                  }
                  window.alert(
                    `Filled ${filled} of ${tocEntries.length} entries. Document is approximately ${result.totalPages} pages.`
                    + (missed.length ? `\n\nNot matched: ${missed.join(', ')}` : '')
                    + '\n\nVerify against a test print before issuing.');
                }}
              >
                Estimate TOC page numbers
              </button>
              <button
                className="report-btn report-btn--outline"
                onClick={() => {
                  if (window.confirm('Replace ALL portfolio text (title page, executive summary, state pages, next steps, disclaimer) with the latest defaults? Your report selections and TOC page numbers are kept. This cannot be undone.')) {
                    resetContent();
                  }
                }}
              >
                Reset text to latest defaults
              </button>

              <div className="portfolio-editor-heading">Title Page</div>
              {line('Title', pf.title, v => set('title', v))}
              {line('Subtitle', pf.subtitle, v => set('subtitle', v))}
              {line('Report type line', pf.reportMeta, v => set('reportMeta', v))}
              {line('Prepared for', pf.preparedFor, v => set('preparedFor', v))}
              {line('Prepared by', pf.preparedBy, v => set('preparedBy', v))}
              {line('Date', pf.reportDate, v => set('reportDate', v))}

              <div className="portfolio-editor-heading">Scope of Engagement</div>
              {txt('Intro paragraph', pf.scopeIntro, v => set('scopeIntro', v), 4)}
              {txt('Scope items (one per line; "Heading | detail")', pf.scopeItems, v => set('scopeItems', v), 8)}
              {txt('Information requirements intro', pf.scopeInfoIntro, v => set('scopeInfoIntro', v), 2)}
              {txt('Information requirements (one per line)', pf.scopeInfoItems, v => set('scopeInfoItems', v), 4)}

              <div className="portfolio-editor-heading">Net Metering &amp; System Sizing</div>
              {txt('Narrative (blank line = new paragraph)', pf.sizingBasis, v => set('sizingBasis', v), 8)}

              <div className="portfolio-editor-heading">Key Considerations</div>
              {txt('Intro paragraph', pf.keyConsiderationsIntro, v => set('keyConsiderationsIntro', v), 3)}
              {txt('Considerations (one per line; "Heading | detail")', pf.keyConsiderations, v => set('keyConsiderations', v), 8)}

              <div className="portfolio-editor-heading">Executive Summary</div>
              {txt('Narrative (blank line = new paragraph)', pf.execSummary, v => set('execSummary', v), 8)}

              <div className="portfolio-editor-heading">Prioritization Groups</div>
              {pf.tiers.map((tier, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  {line(`Group ${i + 1} name`, tier.name, v => set('tiers', pf.tiers.map((t, j) => j === i ? { ...t, name: v } : t)))}
                  {line(`Group ${i + 1} assets (separate with ;)`, tier.assets, v => set('tiers', pf.tiers.map((t, j) => j === i ? { ...t, assets: v } : t)))}
                  {txt(`Group ${i + 1} description`, tier.rationale, v => set('tiers', pf.tiers.map((t, j) => j === i ? { ...t, rationale: v } : t)), 2)}
                </div>
              ))}

              <div className="portfolio-editor-heading">Methodology &amp; Glossary</div>
              {txt('Methodology (blank line = new paragraph)', pf.methodology, v => set('methodology', v), 6)}
              {txt('Glossary (one per line: Term — definition)', pf.glossary, v => set('glossary', v), 6)}

              <div className="portfolio-editor-heading">Next Steps</div>
              {txt('Narrative (blank line = new paragraph)', pf.nextSteps, v => set('nextSteps', v), 8)}
              {txt('Proposed immediate actions (one per line)', pf.nextActions, v => set('nextActions', v), 3)}

              <div className="portfolio-editor-heading">Closing Disclaimer</div>
              {txt('Document-level disclaimer (blank line = new paragraph)', pf.disclaimer, v => set('disclaimer', v), 6)}

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
            <PortfolioTOC pf={pf} entries={tocEntries} setTocPage={setTocPage} />
            <PortfolioScope pf={pf} />
            <PortfolioExecSummary pf={pf} projects={projects} />
            <PortfolioPrioritisation pf={pf} />
            <PortfolioAssetSummary pf={pf} projects={projects} />
            <PortfolioMethodology pf={pf}>
              <PortfolioSizingBasis pf={pf} />
            </PortfolioMethodology>
            <PortfolioKeyConsiderations pf={pf} />
          </div>
          {activeStates.map(abbr => (
            <div key={abbr} className="container">
              <StateOnePager
                abbr={abbr}
                state={pf.states[abbr]}
                projects={byState[abbr]}
                tiers={pf.tiers}
                appendixLetter={appendixOf[abbr]}
              />
            </div>
          ))}
          <div className="container">
            <PortfolioNextSteps pf={pf} />
            <PortfolioDisclaimer pf={pf} />
          </div>

          <div className="container">
            <PortfolioAppendixIndex
              states={activeStates.map(abbr => ({
                abbr,
                letter: appendixOf[abbr],
                name: pf.states[abbr].name,
                assets: byState[abbr].map(({ entry, p }) => p.projectName || entry.name),
              }))}
            />
          </div>

          {activeStates.map(abbr => (
            <div key={`appendix-${abbr}`}>
              <div className="container">
                <div className="section portfolio-page appendix-divider" id={`appendix-${abbr}`}>
                  <div className="appendix-eyebrow">Appendix {appendixOf[abbr]}</div>
                  <div className="section-title">{pf.states[abbr].name} — Asset Reports</div>
                  <p className="portfolio-para">
                    Individual opportunity assessments for the {byState[abbr].length} {pf.states[abbr].name} asset{byState[abbr].length !== 1 ? 's' : ''} summarized in the {pf.states[abbr].name} market one-pager.
                  </p>
                </div>
              </div>
              {byState[abbr].map(({ entry, p, calc, err }) => (
                <div key={entry.id} id={`project-${entry.id}`} className="portfolio-report">
                  {calc ? (
                    <ReportDocument p={p} calc={calc} embedded />
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
        </div>
      </ErrorBoundary>
    </>
  );
}
