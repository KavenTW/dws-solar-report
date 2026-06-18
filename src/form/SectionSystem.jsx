import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import SectionToggleChip from './SectionToggleChip';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionSystem() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  const hasErrors = !!(e?.rooftopSizeDCkW || e?.carportSizeDCkW);
  const totalDCkW = (p.rooftopSizeDCkW || 0) + (p.carportSizeDCkW || 0);
  const totalACkW = (p.rooftopSizeACkW || 0) + (p.carportSizeACkW || 0);

  return (
    <SectionWrapper title="System Specifications" hasErrors={hasErrors} headerExtras={<SectionToggleChip flagKey="showSystemSection" label="System" />} collapseWhen={!p.showSystemSection}>
      <FormField label="Rooftop DC" fieldId="rooftopSizeDCkW" error={e?.rooftopSizeDCkW}>
        <NumberInput value={p.rooftopSizeDCkW} onValueChange={field('rooftopSizeDCkW')} unit="kW" />
      </FormField>
      <FormField label="Rooftop AC" fieldId="rooftopSizeACkW">
        <NumberInput value={p.rooftopSizeACkW} onValueChange={field('rooftopSizeACkW')} unit="kW" />
      </FormField>
      <FormField label="Carport DC" fieldId="carportSizeDCkW">
        <NumberInput value={p.carportSizeDCkW} onValueChange={field('carportSizeDCkW')} unit="kW" />
      </FormField>
      <FormField label="Carport AC" fieldId="carportSizeACkW">
        <NumberInput value={p.carportSizeACkW} onValueChange={field('carportSizeACkW')} unit="kW" />
      </FormField>
      <FormField label="Total DC">
        <div className="readonly-field">
          <span className="readonly-value">{totalDCkW.toLocaleString()}</span>
          <span className="readonly-unit">kW</span>
        </div>
      </FormField>
      <FormField label="Total AC">
        <div className="readonly-field">
          <span className="readonly-value">{totalACkW.toLocaleString()}</span>
          <span className="readonly-unit">kW</span>
        </div>
      </FormField>
    </SectionWrapper>
  );
}
