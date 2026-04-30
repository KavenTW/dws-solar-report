import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionEmissions() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const num = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(ev.target.value) || 0 });
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  return (
    <SectionWrapper title="Grid Emissions">
      <FormField label="Grid Emissions Intensity (lbs CO₂/MWh)" fieldId="gridEmissionsIntensity" error={e?.gridEmissionsIntensity}>
        <input type="number" min="0" value={p.gridEmissionsIntensity} onChange={num('gridEmissionsIntensity')} />
      </FormField>
      <FormField label="Region" fieldId="gridEmissionsRegion" error={e?.gridEmissionsRegion}>
        <input type="text" value={p.gridEmissionsRegion} onChange={txt('gridEmissionsRegion')} />
      </FormField>
      <FormField label="Source Citation" fieldId="gridEmissionsSource" error={e?.gridEmissionsSource}>
        <input type="text" value={p.gridEmissionsSource} onChange={txt('gridEmissionsSource')} />
      </FormField>
      <FormField label="Equiv. Homes Label (U.S. / Canadian)" fieldId="equivHomesLabel" error={e?.equivHomesLabel}>
        <input type="text" value={p.equivHomesLabel} onChange={txt('equivHomesLabel')} />
      </FormField>
      <FormField label="Emissions Disclaimer" fieldId="gridEmissionsDisclaimer" error={e?.gridEmissionsDisclaimer} className="full-width">
        <textarea value={p.gridEmissionsDisclaimer} onChange={txt('gridEmissionsDisclaimer')} rows={3} />
      </FormField>
    </SectionWrapper>
  );
}
