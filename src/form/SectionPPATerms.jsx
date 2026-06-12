import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import SectionToggleChip from './SectionToggleChip';
import FormField from './FormField';
import NumberInput from './NumberInput';
import PercentInput from './PercentInput';

export default function SectionPPATerms() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  const hasErrors = !!(e?.ppaTerm || e?.ppaDiscountRate || e?.year1AvoidedChargesUSD);

  return (
    <SectionWrapper title="PPA Terms & Pricing" hasErrors={hasErrors} headerExtras={<SectionToggleChip flagKey="showPPATermsSection" label="PPA Terms" />} collapseWhen={!p.showPPATermsSection}>
      <FormField label="PPA Term" fieldId="ppaTerm" error={e?.ppaTerm}>
        <NumberInput value={p.ppaTerm} onValueChange={field('ppaTerm')} unit="yrs" />
      </FormField>
      <FormField label="PPA Discount Rate" fieldId="ppaDiscountRate" error={e?.ppaDiscountRate}>
        <PercentInput value={p.ppaDiscountRate} onValueChange={field('ppaDiscountRate')} />
      </FormField>
      <FormField label="PPA Escalation Rate" fieldId="ppaEscalationRate">
        <PercentInput value={p.ppaEscalationRate} onValueChange={field('ppaEscalationRate')} />
      </FormField>
      <FormField label="Est. Year-1 Avoided Utility Charges" fieldId="year1AvoidedChargesUSD" error={e?.year1AvoidedChargesUSD}>
        <NumberInput value={p.year1AvoidedChargesUSD} onValueChange={field('year1AvoidedChargesUSD')} unit="$" />
      </FormField>
      <FormField label="Bundled PPA Rate Year 1" fieldId="year1PPARateMWh">
        <NumberInput value={p.year1PPARateMWh} onValueChange={field('year1PPARateMWh')} unit="$/MWh" />
      </FormField>
      <FormField label="Reference Scenario" fieldId="referenceScenarioIndex">
        <select
          value={p.referenceScenarioIndex}
          onChange={ev => dispatch({ type: 'UPDATE_FIELD', key: 'referenceScenarioIndex', value: parseInt(ev.target.value) })}
        >
          <option value={0}>Low (Scenario 1)</option>
          <option value={1}>Mid (Scenario 2)</option>
          <option value={2}>High (Scenario 3)</option>
        </select>
      </FormField>
      <div className="full-width">
        <label className="field-group-label">
          Utility Escalation Rate Scenarios
        </label>
        <div className="esc-rate-grid">
          {[0, 1, 2].map(i => (
            <FormField key={i} label={`Scenario ${i + 1}`} fieldId={`utilityEscRate${i}`}>
              <PercentInput
                value={p.utilityEscalationRates[i] ?? 0}
                onValueChange={v => dispatch({ type: 'UPDATE_ESC_RATE', index: i, value: v })}
              />
            </FormField>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
