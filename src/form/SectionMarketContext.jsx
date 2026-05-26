import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

function DynamicTable({ rows, columns, onChange }) {
  // columns: [{ key, label, multiline }]
  const setCell = (i, key, val) => {
    const next = rows.map((r, j) => j === i ? { ...r, [key]: val } : r);
    onChange(next);
  };
  const addRow = () => {
    const blank = Object.fromEntries(columns.map(c => [c.key, '']));
    onChange([...rows, blank]);
  };
  const delRow = i => onChange(rows.filter((_, j) => j !== i));

  return (
    <div className="market-dyn-table">
      {rows.map((row, i) => (
        <div key={i} className="market-dyn-row">
          {columns.map(col => (
            <div key={col.key} className="market-dyn-cell">
              <label className="market-dyn-label">{col.label}</label>
              {col.multiline ? (
                <textarea
                  value={row[col.key] ?? ''}
                  onChange={e => setCell(i, col.key, e.target.value)}
                  rows={2}
                />
              ) : (
                <input
                  type="text"
                  value={row[col.key] ?? ''}
                  onChange={e => setCell(i, col.key, e.target.value)}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            className="market-dyn-del"
            onClick={() => delRow(i)}
            title="Remove row"
            aria-label="Remove row"
          >×</button>
        </div>
      ))}
      <button type="button" className="market-dyn-add" onClick={addRow}>
        + Add Row
      </button>
    </div>
  );
}

export default function SectionMarketContext() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });
  const set = (k, v) => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  const chip = (key, label) => (
    <span
      role="button" tabIndex={0}
      className={`report-section-toggle ${p[key] ? 'included' : 'excluded'}`}
      onClick={() => dispatch({ type: 'UPDATE_FIELD', key, value: !p[key] })}
      onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); dispatch({ type: 'UPDATE_FIELD', key, value: !p[key] }); } }}
      title={p[key] ? `Remove ${label} from report` : `Add ${label} to report`}
    >{label}</span>
  );

  const monetizationCols = [
    { key: 'mechanism', label: 'Mechanism',  multiline: false },
    { key: 'behaviour', label: 'Behaviour',  multiline: true },
  ];
  const implicationCols = [
    { key: 'priority',  label: 'Design Priority', multiline: false },
    { key: 'rationale', label: 'Rationale',        multiline: true },
  ];

  return (
    <SectionWrapper
      title="Market Context"
      headerExtras={chip('showMarketContextSection', 'Market Context')}
      collapseWhen={!p.showMarketContextSection}
    >
      <FormField label="Page Title" fieldId="marketContextTitle" className="full-width">
        <input type="text" value={p.marketContextTitle ?? ''} onChange={txt('marketContextTitle')} />
      </FormField>

      <FormField label="Description" fieldId="marketContextDescription" className="full-width">
        <textarea value={p.marketContextDescription ?? ''} onChange={txt('marketContextDescription')} rows={4} />
      </FormField>

      <div className="full-width market-subsection">
        <div className="field-group-label">Monetization Table</div>
        <FormField label="Sub-section Header" fieldId="marketContextMonetizationHeader">
          <input type="text" value={p.marketContextMonetizationHeader ?? ''} onChange={txt('marketContextMonetizationHeader')} />
        </FormField>
        <FormField label="Intro Paragraph" fieldId="marketContextMonetizationIntro" className="full-width">
          <textarea value={p.marketContextMonetizationIntro ?? ''} onChange={txt('marketContextMonetizationIntro')} rows={3} />
        </FormField>
        <DynamicTable
          rows={p.marketContextMonetizationRows ?? []}
          columns={monetizationCols}
          onChange={v => set('marketContextMonetizationRows', v)}
        />
      </div>

      <div className="full-width market-subsection">
        <div className="field-group-label">Strategic Implication Table</div>
        <FormField label="Sub-section Header" fieldId="marketContextImplicationHeader">
          <input type="text" value={p.marketContextImplicationHeader ?? ''} onChange={txt('marketContextImplicationHeader')} />
        </FormField>
        <FormField label="Intro Paragraph" fieldId="marketContextImplicationIntro" className="full-width">
          <textarea value={p.marketContextImplicationIntro ?? ''} onChange={txt('marketContextImplicationIntro')} rows={3} />
        </FormField>
        <DynamicTable
          rows={p.marketContextImplicationRows ?? []}
          columns={implicationCols}
          onChange={v => set('marketContextImplicationRows', v)}
        />
      </div>
    </SectionWrapper>
  );
}
