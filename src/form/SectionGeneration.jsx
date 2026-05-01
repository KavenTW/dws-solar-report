import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';
import MonthlyPctGrid from './MonthlyPctGrid';
import LayoutImageUpload from './LayoutImageUpload';

export default function SectionGeneration() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  const hasErrors = !!(e?.annualMwhHelioScope || e?.monthlyPct);

  return (
    <SectionWrapper title="Generation & Layout" hasErrors={hasErrors}>
      <FormField label="Annual Generation — HelioScope" fieldId="annualMwhHelioScope" error={e?.annualMwhHelioScope}>
        <NumberInput value={p.annualMwhHelioScope} onValueChange={field('annualMwhHelioScope')} unit="MWh" />
      </FormField>
      <FormField label="Annual Site Load" fieldId="annualSiteLoadMwh">
        <NumberInput value={p.annualSiteLoadMwh} onValueChange={field('annualSiteLoadMwh')} decimals={1} unit="MWh" />
      </FormField>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
          Monthly Distribution (% of annual) — click a column to activate it
        </label>
        <MonthlyPctGrid />
        {e?.monthlyPct && <p className="preview-hint" style={{ marginTop: '6px' }}>{e.monthlyPct}</p>}
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Array Layout Image (HelioScope Output)
        </label>
        <LayoutImageUpload />
      </div>
    </SectionWrapper>
  );
}
