import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionDegradation() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;

  return (
    <SectionWrapper title="Module Degradation">
      <FormField label="Annual Degradation Rate (e.g. 0.005 = 0.5%/yr)" fieldId="degradationRate" error={e?.degradationRate}>
        <input
          type="number" min="0" max="0.1" step="0.001"
          value={p.degradationRate}
          onChange={ev => dispatch({ type: 'UPDATE_FIELD', key: 'degradationRate', value: parseFloat(ev.target.value) || 0 })}
        />
      </FormField>
    </SectionWrapper>
  );
}
