import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import PercentInput from './PercentInput';

export default function SectionDegradation() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;

  const hasErrors = !!(e?.degradationRate);
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
    <SectionWrapper title="Module Degradation" hasErrors={hasErrors} headerExtras={chip('showDegradationSection', 'Degradation')} collapseWhen={!p.showDegradationSection}>
      <FormField label="Annual Degradation Rate" fieldId="degradationRate" error={e?.degradationRate}>
        <PercentInput
          value={p.degradationRate}
          onValueChange={v => dispatch({ type: 'UPDATE_FIELD', key: 'degradationRate', value: v })}
          decimals={2}
        />
      </FormField>
    </SectionWrapper>
  );
}
