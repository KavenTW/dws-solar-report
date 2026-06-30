import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';

export default function SectionFeasibility() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });
  const hasCarport = (p.carportSizeDCkW || 0) > 0 || (p.carportAreaUsedSqFt || 0) > 0;

  return (
    <SectionWrapper title="Feasibility Cost Estimates" defaultOpen={false}>
      <p style={{ gridColumn: '1 / -1', fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px' }}>
        Indicative quotes from licensed engineering firms. All items run concurrently (4 weeks each).
        Geotechnical row shows only when a carport is specified.
      </p>

      <FormField label="Points of Interconnection">
        <NumberInput value={p.pointsOfInterconnection} onValueChange={field('pointsOfInterconnection')} unit="pts" />
      </FormField>
      <div />
      <FormField label="Electrical — per point Min ($)">
        <NumberInput value={p.feasElectricalMin} onValueChange={field('feasElectricalMin')} unit="USD" />
      </FormField>
      <FormField label="Electrical — per point Max ($)">
        <NumberInput value={p.feasElectricalMax} onValueChange={field('feasElectricalMax')} unit="USD" />
      </FormField>

      <FormField label="Structural — Min ($)">
        <NumberInput value={p.feasStructuralMin} onValueChange={field('feasStructuralMin')} unit="USD" />
      </FormField>
      <FormField label="Structural — Max ($)">
        <NumberInput value={p.feasStructuralMax} onValueChange={field('feasStructuralMax')} unit="USD" />
      </FormField>

      {hasCarport && <>
        <FormField label="Geotechnical — Min ($)">
          <NumberInput value={p.feasGeotechnicalMin} onValueChange={field('feasGeotechnicalMin')} unit="USD" />
        </FormField>
        <FormField label="Geotechnical — Max ($)">
          <NumberInput value={p.feasGeotechnicalMax} onValueChange={field('feasGeotechnicalMax')} unit="USD" />
        </FormField>
      </>}

      <FormField label="Interconnection Docs — Min ($)">
        <NumberInput value={p.feasInterconnectionMin} onValueChange={field('feasInterconnectionMin')} unit="USD" />
      </FormField>
      <FormField label="Interconnection Docs — Max ($)">
        <NumberInput value={p.feasInterconnectionMax} onValueChange={field('feasInterconnectionMax')} unit="USD" />
      </FormField>
    </SectionWrapper>
  );
}
