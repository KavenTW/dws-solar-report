import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';
import PercentInput from './PercentInput';

export default function SectionWAIRE() {
  const { state, dispatch } = useProject();
  if (!state.project.waireEnabled) return null;
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  const hasErrors = !!(e?.year1WAIREPointValue || e?.waireInstallPtsPerMW ||
                       e?.waireGenMwhPerPt || e?.waireDisclaimer);
  const chip = (key, label) => (
    <span
      role="button" tabIndex={0}
      className={`report-section-toggle ${p[key] ? 'included' : 'excluded'}`}
      onClick={() => dispatch({ type: 'UPDATE_FIELD', key, value: !p[key] })}
      onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); dispatch({ type: 'UPDATE_FIELD', key, value: !p[key] }); } }}
      title={p[key] ? `Remove ${label} page from report` : `Add ${label} page to report`}
    >{label}</span>
  );

  return (
    <SectionWrapper title="WAIRE (CA/SCAQMD — Rule 2305)" hasErrors={hasErrors} headerExtras={chip('showSavingsSection', 'Savings')} collapseWhen={!p.showSavingsSection}>
      <FormField label="Year-1 WAIRE Point Value" fieldId="year1WAIREPointValue" error={e?.year1WAIREPointValue}>
        <NumberInput value={p.year1WAIREPointValue} onValueChange={field('year1WAIREPointValue')} unit="$/pt" />
      </FormField>
      <FormField label="WAIRE Escalation Rate" fieldId="waireEscalationRate">
        <PercentInput value={p.waireEscalationRate} onValueChange={field('waireEscalationRate')} />
      </FormField>
      <FormField label="Installation Credit" fieldId="waireInstallPtsPerMW" error={e?.waireInstallPtsPerMW}>
        <NumberInput value={p.waireInstallPtsPerMW} onValueChange={field('waireInstallPtsPerMW')} decimals={1} unit="pts/MW" />
      </FormField>
      <FormField label="Generation Credit" fieldId="waireGenMwhPerPt" error={e?.waireGenMwhPerPt}>
        <NumberInput value={p.waireGenMwhPerPt} onValueChange={field('waireGenMwhPerPt')} decimals={1} unit="MWh/pt" />
      </FormField>
      <FormField label="WAIRE Disclaimer" fieldId="waireDisclaimer" className="full-width" error={e?.waireDisclaimer}>
        <textarea value={p.waireDisclaimer} onChange={txt('waireDisclaimer')} rows={3} />
      </FormField>
    </SectionWrapper>
  );
}
