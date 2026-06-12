import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import SectionToggleChip from './SectionToggleChip';
import FormField from './FormField';
import PercentInput from './PercentInput';

export default function SectionDegradation() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;

  const hasErrors = !!(e?.degradationRate);
  return (
    <SectionWrapper title="Module Degradation" hasErrors={hasErrors} headerExtras={<SectionToggleChip flagKey="showDegradationSection" label="Degradation" />} collapseWhen={!p.showDegradationSection}>
      <FormField label="Annual Degradation Rate" fieldId="degradationRate" error={e?.degradationRate}>
        <PercentInput
          value={p.degradationRate}
          onValueChange={v => dispatch({ type: 'UPDATE_FIELD', key: 'degradationRate', value: v })}
          decimals={2}
        />
      </FormField>
    </SectionWrapper>
  );
}
