import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionSystem() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  const hasErrors = !!(e?.systemSizeDCkW);

  return (
    <SectionWrapper title="System Specifications" hasErrors={hasErrors}>
      <FormField label="System Size DC" fieldId="systemSizeDCkW" error={e?.systemSizeDCkW}>
        <NumberInput value={p.systemSizeDCkW} onValueChange={field('systemSizeDCkW')} unit="kW" />
      </FormField>
      <FormField label="System Size AC" fieldId="systemSizeACkW">
        <NumberInput value={p.systemSizeACkW} onValueChange={field('systemSizeACkW')} unit="kW" />
      </FormField>
      <FormField label="Module Wattage" fieldId="moduleWp">
        <NumberInput value={p.moduleWp} onValueChange={field('moduleWp')} unit="Wp" />
      </FormField>
    </SectionWrapper>
  );
}
