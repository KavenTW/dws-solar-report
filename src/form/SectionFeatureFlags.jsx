import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';

function Toggle({ label, checked, onChange }) {
  return (
    <div className="toggle-row">
      <label className="toggle">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
      <label onClick={() => onChange(!checked)} style={{ cursor: 'pointer' }}>{label}</label>
    </div>
  );
}

export default function SectionFeatureFlags() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const f = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  return (
    <SectionWrapper title="Jurisdiction & Features">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', gridColumn: '1 / -1' }}>
        <Toggle label="WAIRE Enabled (CA/SCAQMD only)" checked={p.waireEnabled} onChange={f('waireEnabled')} />
        <Toggle label="RECs Enabled" checked={p.recEnabled} onChange={f('recEnabled')} />
        <div className="toggle-row">
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Currency</label>
          <select
            value={p.currency}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', key: 'currency', value: e.target.value })}
            style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', marginLeft: '8px' }}
          >
            <option value="USD">USD ($)</option>
            <option value="CAD">CAD (C$)</option>
          </select>
        </div>
      </div>
    </SectionWrapper>
  );
}
