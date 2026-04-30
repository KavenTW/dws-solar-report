import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionSystem() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const f = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(e.target.value) || 0 });

  return (
    <SectionWrapper title="System Specifications">
      <FormField label="System Size DC (kW)">
        <input type="number" min="0" value={p.systemSizeDCkW} onChange={f('systemSizeDCkW')} />
      </FormField>
      <FormField label="System Size AC (kW)">
        <input type="number" min="0" value={p.systemSizeACkW} onChange={f('systemSizeACkW')} />
      </FormField>
      <FormField label="Module Wattage (Wp)">
        <input type="number" min="0" value={p.moduleWp} onChange={f('moduleWp')} />
      </FormField>
    </SectionWrapper>
  );
}
