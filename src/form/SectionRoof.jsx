import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionRoof() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const f = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(e.target.value) || 0 });

  return (
    <SectionWrapper title="Roof Parameters">
      <FormField label="Roof Area Used (sq ft)">
        <input type="number" min="0" value={p.roofUsedSqFt} onChange={f('roofUsedSqFt')} />
      </FormField>
      <FormField label="Total Roof Area (sq ft)">
        <input type="number" min="0" value={p.roofTotalSqFt} onChange={f('roofTotalSqFt')} />
      </FormField>
    </SectionWrapper>
  );
}
