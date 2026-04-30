import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionDisclaimers() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const txt = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: e.target.value });

  return (
    <SectionWrapper title="Disclaimers" defaultOpen={false}>
      <FormField label="Grid Emissions Disclaimer" style={{ gridColumn: '1 / -1' }}>
        <textarea value={p.gridEmissionsDisclaimer} onChange={txt('gridEmissionsDisclaimer')} rows={3} />
      </FormField>
      {p.waireEnabled && (
        <FormField label="WAIRE Disclaimer" style={{ gridColumn: '1 / -1' }}>
          <textarea value={p.waireDisclaimer} onChange={txt('waireDisclaimer')} rows={3} />
        </FormField>
      )}
    </SectionWrapper>
  );
}
