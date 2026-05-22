import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionDisclaimers() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  const hasErrors = !!(e?.gridEmissionsDisclaimer || (p.waireEnabled && e?.waireDisclaimer));
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
    <SectionWrapper title="Disclaimers" defaultOpen={false} hasErrors={hasErrors} headerExtras={chip('showDisclaimerSection', 'Disclaimer')} collapseWhen={!p.showDisclaimerSection}>
      <FormField label="Grid Emissions Disclaimer" fieldId="gridEmissionsDisclaimer" error={e?.gridEmissionsDisclaimer} className="full-width">
        <textarea value={p.gridEmissionsDisclaimer} onChange={txt('gridEmissionsDisclaimer')} rows={3} />
      </FormField>
      {p.waireEnabled && (
        <FormField label="WAIRE Disclaimer" fieldId="waireDisclaimer" error={e?.waireDisclaimer} className="full-width">
          <textarea value={p.waireDisclaimer} onChange={txt('waireDisclaimer')} rows={3} />
        </FormField>
      )}
    </SectionWrapper>
  );
}
