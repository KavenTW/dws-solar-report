import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionPPATerms() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const num = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(ev.target.value) || 0 });

  return (
    <SectionWrapper title="PPA Terms & Pricing">
      <FormField label="PPA Term (years)" fieldId="ppaTerm" error={e?.ppaTerm}>
        <input type="number" min="1" max="40" value={p.ppaTerm} onChange={num('ppaTerm')} />
      </FormField>
      <FormField label="PPA Discount Rate (e.g. 0.10 = 10%)" fieldId="ppaDiscountRate" error={e?.ppaDiscountRate}>
        <input type="number" min="0" max="0.99" step="0.01" value={p.ppaDiscountRate} onChange={num('ppaDiscountRate')} />
      </FormField>
      <FormField label="PPA Escalation Rate (e.g. 0.03 = 3%/yr)" fieldId="ppaEscalationRate">
        <input type="number" min="0" max="0.2" step="0.01" value={p.ppaEscalationRate} onChange={num('ppaEscalationRate')} />
      </FormField>
      <FormField label="Est. Year-1 Avoided Utility Charges ($)" fieldId="year1AvoidedChargesUSD" error={e?.year1AvoidedChargesUSD}>
        <input type="number" min="0" value={p.year1AvoidedChargesUSD} onChange={num('year1AvoidedChargesUSD')} />
      </FormField>
      <FormField label="Bundled PPA Rate Year 1 ($/MWh, shown to tenant)" fieldId="year1PPARateMWh">
        <input type="number" min="0" value={p.year1PPARateMWh} onChange={num('year1PPARateMWh')} />
      </FormField>
      <FormField label="Reference Scenario (0=low, 1=mid, 2=high)" fieldId="referenceScenarioIndex">
        <select
          value={p.referenceScenarioIndex}
          onChange={ev => dispatch({ type: 'UPDATE_FIELD', key: 'referenceScenarioIndex', value: parseInt(ev.target.value) })}
        >
          <option value={0}>0 — Low (Scenario 1)</option>
          <option value={1}>1 — Mid (Scenario 2)</option>
          <option value={2}>2 — High (Scenario 3)</option>
        </select>
      </FormField>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Utility Escalation Rate Scenarios (3 values)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[0, 1, 2].map(i => (
            <FormField key={i} label={`Scenario ${i + 1}`} fieldId={`utilityEscRate${i}`}>
              <input
                type="number" min="0" max="0.5" step="0.01"
                value={p.utilityEscalationRates[i] ?? 0}
                onChange={ev => dispatch({ type: 'UPDATE_ESC_RATE', index: i, value: parseFloat(ev.target.value) || 0 })}
              />
            </FormField>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
