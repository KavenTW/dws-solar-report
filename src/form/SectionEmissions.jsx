import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionEmissions() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  const hasErrors = !!(e?.gridEmissionsIntensity || e?.gridEmissionsSource ||
                       e?.gridEmissionsRegion || e?.equivHomesLabel || e?.gridEmissionsDisclaimer);

  return (
    <SectionWrapper title="Grid Emissions" hasErrors={hasErrors}>
      <FormField label="Grid Emissions Intensity" fieldId="gridEmissionsIntensity" error={e?.gridEmissionsIntensity}>
        <NumberInput value={p.gridEmissionsIntensity} onValueChange={field('gridEmissionsIntensity')} unit="lbs/MWh" />
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
