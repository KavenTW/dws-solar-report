import { useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
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

export default function InputsTab() {
  const { state, dispatch } = useProject();
  const { project } = state;

  // After SET_FORM_ERRORS, SectionWrapper forces error sections open on the next
  // render.  Two rAF ticks give React time to re-render and the DOM to settle
  // before we query for the first invalid field.
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
        <h1>Project Inputs</h1>
        <p>Fill in the fields below, then click "Preview Report" to generate the proposal.</p>
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
