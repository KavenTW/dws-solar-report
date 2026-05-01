import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionWAIRE() {
  const { state, dispatch } = useProject();
  if (!state.project.waireEnabled) return null;
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  return (
    <SectionWrapper title="WAIRE (CA/SCAQMD — Rule 2305)">
      <FormField label="Year-1 WAIRE Point Value ($/point)" fieldId="year1WAIREPointValue" error={e?.year1WAIREPointValue}>
        <NumberInput value={p.year1WAIREPointValue} onValueChange={field('year1WAIREPointValue')} />
      </FormField>
      <FormField label="WAIRE Escalation Rate (e.g. 0 = flat)" fieldId="waireEscalationRate">
        <NumberInput value={p.waireEscalationRate} onValueChange={field('waireEscalationRate')} decimals={2} />
      </FormField>
      <FormField label="Installation Credit (pts/MW DC)" fieldId="waireInstallPtsPerMW" error={e?.waireInstallPtsPerMW}>
        <NumberInput value={p.waireInstallPtsPerMW} onValueChange={field('waireInstallPtsPerMW')} decimals={1} />
      </FormField>
      <FormField label="Generation Credit (MWh per point)" fieldId="waireGenMwhPerPt" error={e?.waireGenMwhPerPt}>
        <NumberInput value={p.waireGenMwhPerPt} onValueChange={field('waireGenMwhPerPt')} decimals={1} />
      </FormField>
      <FormField label="WAIRE Disclaimer" fieldId="waireDisclaimer" className="full-width" error={e?.waireDisclaimer}>
        <textarea value={p.waireDisclaimer} onChange={txt('waireDisclaimer')} rows={3} />
      </FormField>
    </SectionWrapper>
  );
}
