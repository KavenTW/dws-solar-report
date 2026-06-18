import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import SectionToggleChip from './SectionToggleChip';
import FormField from './FormField';

export default function SectionSiteInfo() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const txt = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: e.target.value });

  const headerExtras = <SectionToggleChip flagKey="showSiteInfoSection" label="Site Info" />;

  return (
    <SectionWrapper title="Site Information" defaultOpen={false} headerExtras={headerExtras} collapseWhen={!p.showSiteInfoSection}>
      <FormField label="Lat / Long">
        <input type="text" value={p.siteLatLong} onChange={txt('siteLatLong')} placeholder="33.79°N / 117.23°W" />
      </FormField>
      <FormField label="Climate Zone">
        <input type="text" value={p.siteClimateZone} onChange={txt('siteClimateZone')} />
      </FormField>
      <FormField label="Avg. Peak Sun Hours">
        <input type="text" value={p.sitePSH} onChange={txt('sitePSH')} />
      </FormField>
      <FormField label="Annual GHI">
        <input type="text" value={p.siteGHI} onChange={txt('siteGHI')} />
      </FormField>
      <FormField label="Avg. Annual Temperature">
        <input type="text" value={p.siteAvgTemp} onChange={txt('siteAvgTemp')} />
      </FormField>
      <FormField label="Building Type">
        <input type="text" value={p.siteBuildingType} onChange={txt('siteBuildingType')} />
      </FormField>
      <FormField label="Roof Type">
        <input type="text" value={p.siteRoofType} onChange={txt('siteRoofType')} />
      </FormField>
      <FormField label="Utility">
        <input type="text" value={p.siteUtility} onChange={txt('siteUtility')} />
      </FormField>
      <FormField label="Solar Program / Tariff">
        <input type="text" value={p.siteSolarProgram} onChange={txt('siteSolarProgram')} />
      </FormField>
    </SectionWrapper>
  );
}
