import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import SectionToggleChip from './SectionToggleChip';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionRoof() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  return (
    <SectionWrapper title="Roof Parameters" headerExtras={<SectionToggleChip flagKey="showRoofSection" label="Roof" />} collapseWhen={!p.showRoofSection}>
      <FormField label="Rooftop Area Used" fieldId="rooftopAreaUsedSqFt" error={e?.rooftopAreaUsedSqFt}>
        <NumberInput value={p.rooftopAreaUsedSqFt} onValueChange={field('rooftopAreaUsedSqFt')} unit="ft²" />
      </FormField>
      <FormField label="Total Rooftop Area" fieldId="rooftopTotalSqFt" error={e?.rooftopTotalSqFt}>
        <NumberInput value={p.rooftopTotalSqFt} onValueChange={field('rooftopTotalSqFt')} unit="ft²" />
      </FormField>
      <FormField label="Carport Area Used" fieldId="carportAreaUsedSqFt" error={e?.carportAreaUsedSqFt}>
        <NumberInput value={p.carportAreaUsedSqFt} onValueChange={field('carportAreaUsedSqFt')} unit="ft²" />
      </FormField>
      <FormField label="Total Carport Area" fieldId="carportTotalSqFt" error={e?.carportTotalSqFt}>
        <NumberInput value={p.carportTotalSqFt} onValueChange={field('carportTotalSqFt')} unit="ft²" />
      </FormField>
      {/* Left blank on purpose where unknown — the report prints
          "To be confirmed" rather than omitting the row. */}
      <FormField label="Roof Installed / Last Replaced" fieldId="roofInstallYear">
        <input
          type="text"
          id="roofInstallYear"
          value={p.roofInstallYear}
          onChange={ev => field('roofInstallYear')(ev.target.value)}
          placeholder="e.g. 2014 — blank prints “To be confirmed”"
        />
      </FormField>
      <FormField label="Tentative Roof Replacement" fieldId="roofReplacementYear">
        <input
          type="text"
          id="roofReplacementYear"
          value={p.roofReplacementYear}
          onChange={ev => field('roofReplacementYear')(ev.target.value)}
          placeholder="e.g. 2033 — blank prints “To be confirmed”"
        />
      </FormField>
    </SectionWrapper>
  );
}
