import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionRoof() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  return (
    <SectionWrapper title="Roof Parameters">
      <FormField label="Roof Area Used" fieldId="roofUsedSqFt" error={e?.roofUsedSqFt}>
        <NumberInput value={p.roofUsedSqFt} onValueChange={field('roofUsedSqFt')} unit="sq ft" />
      </FormField>
      <FormField label="Total Roof Area" fieldId="roofTotalSqFt" error={e?.roofTotalSqFt}>
        <NumberInput value={p.roofTotalSqFt} onValueChange={field('roofTotalSqFt')} unit="sq ft" />
      </FormField>
    </SectionWrapper>
  );
}
