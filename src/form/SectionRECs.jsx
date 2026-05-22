import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';
import PercentInput from './PercentInput';

export default function SectionRECs() {
  const { state, dispatch } = useProject();
  if (!state.project.recEnabled) return null;
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  const hasErrors = !!(e?.year1RECValue || e?.recProgramName);
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
    <SectionWrapper title="Renewable Energy Certificates (RECs)" hasErrors={hasErrors} headerExtras={chip('showSavingsSection', 'Savings')} collapseWhen={!p.showSavingsSection}>
      <FormField label="Year-1 REC Value" fieldId="year1RECValue" error={e?.year1RECValue}>
        <NumberInput value={p.year1RECValue} onValueChange={field('year1RECValue')} unit="$/MWh" />
      </FormField>
      <FormField label="REC Escalation Rate" fieldId="recEscalationRate">
        <PercentInput value={p.recEscalationRate} onValueChange={field('recEscalationRate')} />
      </FormField>
      <FormField label="Program Name (RECs / REGOs)" fieldId="recProgramName" error={e?.recProgramName}>
        <input type="text" value={p.recProgramName} onChange={txt('recProgramName')} />
      </FormField>
    </SectionWrapper>
  );
}
