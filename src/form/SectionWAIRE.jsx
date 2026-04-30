import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionWAIRE() {
  const { state, dispatch } = useProject();
  if (!state.project.waireEnabled) return null;
  const p = state.project;
  const num = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: parseFloat(e.target.value) || 0 });
  const txt = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: e.target.value });

  return (
    <SectionWrapper title="WAIRE (CA/SCAQMD — Rule 2305)">
      <FormField label="Year-1 WAIRE Point Value ($/point)">
        <input type="number" min="0" value={p.year1WAIREPointValue} onChange={num('year1WAIREPointValue')} />
      </FormField>
      <FormField label="WAIRE Escalation Rate (e.g. 0 = flat)">
        <input type="number" min="0" step="0.01" value={p.waireEscalationRate} onChange={num('waireEscalationRate')} />
      </FormField>
      <FormField label="Installation Credit (pts/MW DC)">
        <input type="number" min="0" value={p.waireInstallPtsPerMW} onChange={num('waireInstallPtsPerMW')} />
      </FormField>
      <FormField label="Generation Credit (MWh per point)">
        <input type="number" min="0" value={p.waireGenMwhPerPt} onChange={num('waireGenMwhPerPt')} />
      </FormField>
      <FormField label="WAIRE Disclaimer" className="full-width" style={{ gridColumn: '1 / -1' }}>
        <textarea value={p.waireDisclaimer} onChange={txt('waireDisclaimer')} rows={3} />
      </FormField>
    </SectionWrapper>
  );
}
