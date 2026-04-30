import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionEmissions() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const num = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(e.target.value) || 0 });
  const txt = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: e.target.value });

  return (
    <SectionWrapper title="Grid Emissions">
      <FormField label="Grid Emissions Intensity (lbs CO₂/MWh)">
        <input type="number" min="0" value={p.gridEmissionsIntensity} onChange={num('gridEmissionsIntensity')} />
      </FormField>
      <FormField label="Region">
        <input type="text" value={p.gridEmissionsRegion} onChange={txt('gridEmissionsRegion')} />
      </FormField>
      <FormField label="Source Citation">
        <input type="text" value={p.gridEmissionsSource} onChange={txt('gridEmissionsSource')} />
      </FormField>
      <FormField label="Equiv. Homes Label (U.S. / Canadian)">
        <input type="text" value={p.equivHomesLabel} onChange={txt('equivHomesLabel')} />
      </FormField>
      <FormField label="Emissions Disclaimer" style={{ gridColumn: '1 / -1' }}>
        <textarea value={p.gridEmissionsDisclaimer} onChange={txt('gridEmissionsDisclaimer')} rows={3} />
      </FormField>
    </SectionWrapper>
  );
}
