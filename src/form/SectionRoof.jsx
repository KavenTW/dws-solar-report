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
      <FormField label="Roof Area Used" fieldId="roofUsedSqFt" error={e?.roofUsedSqFt}>
        <NumberInput value={p.roofUsedSqFt} onValueChange={field('roofUsedSqFt')} unit="sq ft" />
      </FormField>
      <FormField label="Total Roof Area" fieldId="roofTotalSqFt" error={e?.roofTotalSqFt}>
        <NumberInput value={p.roofTotalSqFt} onValueChange={field('roofTotalSqFt')} unit="sq ft" />
      </FormField>
    </SectionWrapper>
  );
}
