import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import SectionToggleChip from './SectionToggleChip';

function Toggle({ label, checked, onChange }) {
  return (
    <div className="toggle-row">
      <label className="toggle">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
      <label onClick={() => onChange(!checked)}>{label}</label>
    </div>
  );
}

export default function SectionFeatureFlags() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const f = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  return (
    <SectionWrapper title="Jurisdiction & Features" headerExtras={<SectionToggleChip flagKey="showFeaturesSection" label="Features" />} collapseWhen={!p.showFeaturesSection}>
      <div className="full-width flag-toggles">
        <Toggle label="WAIRE Enabled (CA/SCAQMD only)" checked={p.waireEnabled} onChange={f('waireEnabled')} />
        <Toggle label="RECs Enabled" checked={p.recEnabled} onChange={f('recEnabled')} />
        <div className="toggle-row">
          <label className="field-group-label" style={{ marginBottom: 0 }}>Currency</label>
          <select
            className="feature-select"
            value={p.currency}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', key: 'currency', value: e.target.value })}
          >
            <option value="USD">USD ($)</option>
            <option value="CAD">CAD (C$)</option>
          </select>
        </div>
      </div>
    </SectionWrapper>
  );
}
