import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import MonthlyPctGrid from './MonthlyPctGrid';
import LayoutImageUpload from './LayoutImageUpload';

export default function SectionGeneration() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const f = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(ev.target.value) || 0 });

  return (
    <SectionWrapper title="Generation & Layout">
      <FormField label="Annual Generation — HelioScope (MWh)" fieldId="annualMwhHelioScope" error={e?.annualMwhHelioScope}>
        <input type="number" min="0" value={p.annualMwhHelioScope} onChange={f('annualMwhHelioScope')} />
      </FormField>
      <FormField label="Annual Site Load (MWh)" fieldId="annualSiteLoadMwh">
        <input type="number" min="0" value={p.annualSiteLoadMwh} onChange={f('annualSiteLoadMwh')} step="0.001" />
      </FormField>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Monthly Generation Distribution (% of annual — must sum to 100)
        </label>
        <div style={{ marginTop: '8px' }}>
          <MonthlyPctGrid />
        </div>
        {e?.monthlyPct && <p className="preview-hint">{e.monthlyPct}</p>}
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Array Layout Image (HelioScope Output)
        </label>
        <LayoutImageUpload />
      </div>
    </SectionWrapper>
  );
}
