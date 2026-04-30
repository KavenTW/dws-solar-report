import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionRECs() {
  const { state, dispatch } = useProject();
  if (!state.project.recEnabled) return null;
  const p = state.project;
  const e = state.formErrors;
  const num = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(ev.target.value) || 0 });
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  return (
    <SectionWrapper title="Renewable Energy Certificates (RECs)">
      <FormField label="Year-1 REC Value ($/MWh)" fieldId="year1RECValue" error={e?.year1RECValue}>
        <input type="number" min="0" value={p.year1RECValue} onChange={num('year1RECValue')} />
      </FormField>
      <FormField label="REC Escalation Rate (e.g. 0 = flat)" fieldId="recEscalationRate">
        <input type="number" min="0" step="0.01" value={p.recEscalationRate} onChange={num('recEscalationRate')} />
      </FormField>
      <FormField label="Program Name (RECs / REGOs)" fieldId="recProgramName" error={e?.recProgramName}>
        <input type="text" value={p.recProgramName} onChange={txt('recProgramName')} />
      </FormField>
    </SectionWrapper>
  );
}
