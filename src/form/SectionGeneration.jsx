import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';
import NumberInput from './NumberInput';
import MonthlyPctGrid from './MonthlyPctGrid';
import LayoutImageUpload from './LayoutImageUpload';

export default function SectionGeneration() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const field = k => v => dispatch({ type: 'UPDATE_FIELD', key: k, value: v });

  const hasErrors = !!(e?.annualMwhHelioScope || e?.monthlyPct);
  const toggleField = key => () => dispatch({ type: 'UPDATE_FIELD', key, value: !p[key] });

  const chipKeyDown = fn => e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } };

  const headerExtras = (
    <>
      <span
        role="button"
        tabIndex={0}
        className={`report-section-toggle ${p.showLayoutSection ? 'included' : 'excluded'}`}
        onClick={toggleField('showLayoutSection')}
        onKeyDown={chipKeyDown(toggleField('showLayoutSection'))}
        title={p.showLayoutSection ? 'Remove Layout page from report' : 'Add Layout page to report'}
      >Layout</span>
      <span
        role="button"
        tabIndex={0}
        className={`report-section-toggle ${p.showGenerationSection ? 'included' : 'excluded'}`}
        onClick={toggleField('showGenerationSection')}
        onKeyDown={chipKeyDown(toggleField('showGenerationSection'))}
        title={p.showGenerationSection ? 'Remove Generation page from report' : 'Add Generation page to report'}
      >Generation</span>
    </>
  );

  return (
    <SectionWrapper title="Generation & Layout" hasErrors={hasErrors} headerExtras={headerExtras} collapseWhen={!p.showLayoutSection && !p.showGenerationSection}>
      <FormField label="Annual Generation — HelioScope" fieldId="annualMwhHelioScope" error={e?.annualMwhHelioScope}>
        <NumberInput value={p.annualMwhHelioScope} onValueChange={field('annualMwhHelioScope')} unit="MWh" />
      </FormField>
      <FormField label="Annual Site Load" fieldId="annualSiteLoadMwh">
        <NumberInput value={p.annualSiteLoadMwh} onValueChange={field('annualSiteLoadMwh')} decimals={1} unit="MWh" />
      </FormField>
      <div className="full-width">
        <label className="field-group-label">
          Monthly Distribution (% of annual) — click a column to activate it
        </label>
        <MonthlyPctGrid />
        {e?.monthlyPct && <p className="preview-hint" style={{ marginTop: '6px' }}>{e.monthlyPct}</p>}
      </div>
      <div className="full-width">
        <label className="field-group-label">
          Array Layout Image (HelioScope Output)
        </label>
        <LayoutImageUpload />
      </div>
    </SectionWrapper>
  );
}
