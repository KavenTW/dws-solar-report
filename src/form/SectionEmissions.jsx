import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import SectionToggleChip from './SectionToggleChip';
import FormField from './FormField';
import NumberInput from './NumberInput';

const EGRID_PRESETS = [
  { label: 'California (CAMX)',    state: 'California, USA',     subregion: 'CAMX', intensity: 430,  source: 'U.S. EPA eGRID — CAMX (California)',                    disclaimer: 'Grid emissions factor sourced from U.S. EPA eGRID CAMX subregion (California).' },
  { label: 'Florida (FRCC)',       state: 'Florida, USA',        subregion: 'FRCC', intensity: 785,  source: 'U.S. EPA eGRID — FRCC (Florida)',                        disclaimer: 'Grid emissions factor sourced from U.S. EPA eGRID FRCC subregion (Florida).' },
  { label: 'North Carolina (SRVC)',state: 'North Carolina, USA', subregion: 'SRVC', intensity: 596,  source: 'U.S. EPA eGRID — SRVC (North Carolina)',                 disclaimer: 'Grid emissions factor sourced from U.S. EPA eGRID SRVC subregion (North Carolina).' },
  { label: 'Illinois (RFCW)',      state: 'Illinois, USA',       subregion: 'RFCW', intensity: 916,  source: 'U.S. EPA eGRID — RFCW (Illinois)',                       disclaimer: 'Grid emissions factor sourced from U.S. EPA eGRID RFCW subregion (Illinois).' },
  { label: 'Texas (ERCT)',         state: 'Texas, USA',          subregion: 'ERCT', intensity: 737,  source: 'U.S. EPA eGRID — ERCT (Texas)',                          disclaimer: 'Grid emissions factor sourced from U.S. EPA eGRID ERCT subregion (Texas).' },
  { label: 'Nevada (AZNM)',        state: 'Nevada, USA',         subregion: 'AZNM', intensity: 706,  source: 'U.S. EPA eGRID — AZNM (Nevada)',                         disclaimer: 'Grid emissions factor sourced from U.S. EPA eGRID AZNM subregion (Nevada).' },
];

export default function SectionEmissions() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  const applyPreset = ev => {
    const preset = EGRID_PRESETS.find(x => x.subregion === ev.target.value);
    if (!preset) return;
    dispatch({ type: 'UPDATE_FIELD', key: 'gridEmissionsIntensity', value: preset.intensity });
    dispatch({ type: 'UPDATE_FIELD', key: 'gridEmissionsRegion',    value: preset.state });
    dispatch({ type: 'UPDATE_FIELD', key: 'gridEmissionsSource',    value: preset.source });
    dispatch({ type: 'UPDATE_FIELD', key: 'gridEmissionsDisclaimer',value: preset.disclaimer });
  };

  const hasErrors = !!(e?.gridEmissionsIntensity || e?.gridEmissionsSource ||
                       e?.gridEmissionsRegion || e?.equivHomesLabel || e?.gridEmissionsDisclaimer);
  return (
    <SectionWrapper title="Grid Emissions" hasErrors={hasErrors} headerExtras={<SectionToggleChip flagKey="showEmissionsSection" label="Emissions" />} collapseWhen={!p.showEmissionsSection}>
      <FormField label="eGRID Preset" className="full-width">
        <select onChange={applyPreset} defaultValue="">
          <option value="" disabled>— Select state to auto-fill —</option>
          {EGRID_PRESETS.map(x => (
            <option key={x.subregion} value={x.subregion}>{x.label} — {x.intensity} lbs CO₂e/MWh</option>
          ))}
        </select>
      </FormField>
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
