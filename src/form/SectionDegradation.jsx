import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionDegradation() {
  const { state, dispatch } = useProject();
  const p = state.project;

  return (
    <SectionWrapper title="Module Degradation">
      <FormField label="Annual Degradation Rate (e.g. 0.005 = 0.5%/yr)">
        <input
          type="number" min="0" max="0.1" step="0.001"
          value={p.degradationRate}
          onChange={e => dispatch({ type: 'UPDATE_FIELD', key: 'degradationRate', value: parseFloat(e.target.value) || 0 })}
        />
      </FormField>
    </SectionWrapper>
  );
}
