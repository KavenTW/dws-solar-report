import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionSystem() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const f = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(ev.target.value) || 0 });

  return (
    <SectionWrapper title="System Specifications">
      <FormField label="System Size DC (kW)" fieldId="systemSizeDCkW" error={e?.systemSizeDCkW}>
        <input type="number" min="0" value={p.systemSizeDCkW} onChange={f('systemSizeDCkW')} />
      </FormField>
      <FormField label="System Size AC (kW)" fieldId="systemSizeACkW">
        <input type="number" min="0" value={p.systemSizeACkW} onChange={f('systemSizeACkW')} />
      </FormField>
      <FormField label="Module Wattage (Wp)" fieldId="moduleWp">
        <input type="number" min="0" value={p.moduleWp} onChange={f('moduleWp')} />
      </FormField>
    </SectionWrapper>
  );
}
