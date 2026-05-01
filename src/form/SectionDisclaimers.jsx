import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionDisclaimers() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const txt = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  const hasErrors = !!(e?.gridEmissionsDisclaimer || (p.waireEnabled && e?.waireDisclaimer));

  return (
    <SectionWrapper title="Disclaimers" defaultOpen={false} hasErrors={hasErrors}>
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
