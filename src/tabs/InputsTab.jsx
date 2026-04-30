import { useProject } from '../context/ProjectContext';
import { validateProject, monthlyPctSum } from '../constants/validation';
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
import SectionDisclaimers from '../form/SectionDisclaimers';
import '../styles/form.css';

export default function InputsTab() {
  const { state, dispatch } = useProject();
  const { project } = state;
  const sum = monthlyPctSum(project.monthlyPct);
  const monthlyOk = Math.abs(sum - 100) <= 0.2;

  function handlePreview() {
    const errors = validateProject(project);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_FORM_ERRORS', errors });
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <SectionDisclaimers />

      <div className="preview-report-bar">
        <button
          className="btn-preview"
          onClick={handlePreview}
          disabled={!monthlyOk}
        >
          Preview Report →
        </button>
        {!monthlyOk && (
          <p className="preview-hint">Monthly % must sum to 100 before previewing.</p>
        )}
        {monthlyOk && errorCount > 0 && (
          <p className="validation-error-count">
            {errorCount} required field{errorCount > 1 ? 's' : ''} need attention — see highlighted fields above.
          </p>
        )}
      </div>
    </div>
  );
}
