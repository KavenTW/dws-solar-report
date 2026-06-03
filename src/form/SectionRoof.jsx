import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionRoof() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  const chip = (key, label) => (
    <span
      role="button" tabIndex={0}
      className={`report-section-toggle ${p[key] ? 'included' : 'excluded'}`}
      onClick={() => dispatch({ type: 'UPDATE_FIELD', key, value: !p[key] })}
      onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); dispatch({ type: 'UPDATE_FIELD', key, value: !p[key] }); } }}
      title={p[key] ? `Remove ${label} page from report` : `Add ${label} page to report`}
    >{label}</span>
  );

  return (
    <SectionWrapper title="Roof Parameters" headerExtras={chip('showRoofSection', 'Roof')} collapseWhen={!p.showRoofSection}>
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
    </SectionWrapper>
  );
}
