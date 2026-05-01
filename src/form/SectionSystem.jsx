import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionSystem() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  return (
    <SectionWrapper title="System Specifications">
      <FormField label="System Size DC (kW)" fieldId="systemSizeDCkW" error={e?.systemSizeDCkW}>
        <NumberInput value={p.systemSizeDCkW} onValueChange={field('systemSizeDCkW')} />
      </FormField>
      <FormField label="System Size AC (kW)" fieldId="systemSizeACkW">
        <NumberInput value={p.systemSizeACkW} onValueChange={field('systemSizeACkW')} />
      </FormField>
      <FormField label="Module Wattage (Wp)" fieldId="moduleWp">
        <NumberInput value={p.moduleWp} onValueChange={field('moduleWp')} />
      </FormField>
    </SectionWrapper>
  );
}
