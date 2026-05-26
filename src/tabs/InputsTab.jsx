import { useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { SectionCollapseProvider, useSectionCollapse } from '../context/SectionCollapseContext';
import { validateProject } from '../constants/validation';
import SaveLoadBar from '../form/SaveLoadBar';
import SectionIdentity from '../form/SectionIdentity';
import SectionSystem from '../form/SectionSystem';
import SectionRoof from '../form/SectionRoof';
import SectionGeneration from '../form/SectionGeneration';
import SectionFeatureFlags from '../form/SectionFeatureFlags';
import SectionPPATerms from '../form/SectionPPATerms';
import SectionRECs from '../form/SectionRECs';
import SectionWAIRE from '../form/SectionWAIRE';
import SectionDegradation from '../form/SectionDegradation';
import SectionEmissions from '../form/SectionEmissions';
import SectionSiteInfo from '../form/SectionSiteInfo';
import SectionMarketContext from '../form/SectionMarketContext';
import SectionDisclaimers from '../form/SectionDisclaimers';
import '../styles/form.css';

function InputsTabInner() {
  const { state, dispatch } = useProject();
  const { project } = state;
  const { expandAll, collapseAll } = useSectionCollapse();

  useEffect(() => {
    if (Object.keys(state.formErrors).length === 0) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const firstInvalid = document.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus({ preventScroll: true });
        }
      });
    });
    return () => cancelAnimationFrame(id);
  }, [state.formErrors]);

  function handlePreview() {
    const errors = validateProject(project);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_FORM_ERRORS', errors });
      return;
    }
    dispatch({ type: 'SET_FORM_ERRORS', errors: {} });
    dispatch({ type: 'SET_TAB', tab: 'report' });
  }

  const errorCount = Object.keys(state.formErrors).length;

  return (
    <div className="inputs-tab">
      <div className="inputs-header">
        <div className="inputs-header-row">
          <div>
            <h1>Project Inputs</h1>
            <p>Fill in the fields below, then click "Preview Report" to generate the proposal.</p>
          </div>
          <div className="section-collapse-btns">
            <button className="btn-section-ctrl" onClick={expandAll}>Expand All</button>
            <button className="btn-section-ctrl" onClick={collapseAll}>Collapse All</button>
          </div>
        </div>
      </div>

      <SaveLoadBar />

      <SectionIdentity />
      <SectionFeatureFlags />
      <SectionSystem />
      <SectionRoof />
      <SectionGeneration />
      <SectionPPATerms />
      {state.project.recEnabled && <SectionRECs />}
      {state.project.waireEnabled && <SectionWAIRE />}
      <SectionDegradation />
      <SectionEmissions />
      <SectionSiteInfo />
      <SectionMarketContext />
      <SectionDisclaimers />

      <div className="preview-report-bar">
        <button className="btn-preview" onClick={handlePreview}>
          Preview Report →
        </button>
        {errorCount > 0 && (
          <p className="validation-error-count">
            {errorCount} field{errorCount > 1 ? 's' : ''} need attention — see highlighted sections above.
          </p>
        )}
      </div>
    </div>
  );
}

export default function InputsTab() {
  return (
    <SectionCollapseProvider>
      <InputsTabInner />
    </SectionCollapseProvider>
  );
}
