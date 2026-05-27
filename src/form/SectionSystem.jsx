import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionSystem() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  const hasErrors = !!(e?.rooftopSizeDCkW || e?.carportSizeDCkW);
  const totalDCkW = (p.rooftopSizeDCkW || 0) + (p.carportSizeDCkW || 0);

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
    <SectionWrapper title="System Specifications" hasErrors={hasErrors} headerExtras={chip('showSystemSection', 'System')} collapseWhen={!p.showSystemSection}>
      <FormField label="Rooftop DC" fieldId="rooftopSizeDCkW" error={e?.rooftopSizeDCkW}>
        <NumberInput value={p.rooftopSizeDCkW} onValueChange={field('rooftopSizeDCkW')} unit="kW" />
      </FormField>
      <FormField label="Carport DC" fieldId="carportSizeDCkW">
        <NumberInput value={p.carportSizeDCkW} onValueChange={field('carportSizeDCkW')} unit="kW" />
      </FormField>
      <FormField label="Total DC" fieldId="totalDCkW">
        <div className="readonly-field">
          <span className="readonly-value">{totalDCkW.toLocaleString()}</span>
          <span className="readonly-unit">kW</span>
        </div>
      </FormField>
      <FormField label="System Size AC" fieldId="systemSizeACkW">
        <NumberInput value={p.systemSizeACkW} onValueChange={field('systemSizeACkW')} unit="kW" />
      </FormField>
    </SectionWrapper>
  );
}
