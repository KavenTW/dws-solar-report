import { useProject } from '../context/ProjectContext';

/**
 * Toggle chip shown in a section header that includes/excludes a report
 * section. Replaces the chip() helper that was copy-pasted per section.
 */
export default function SectionToggleChip({ flagKey, label }) {
  const { state, dispatch } = useProject();
  const on = !!state.project[flagKey];
  const toggle = () => dispatch({ type: 'UPDATE_FIELD', key: flagKey, value: !on });
  return (
    <span
      role="button"
      tabIndex={0}
      className={`report-section-toggle ${on ? 'included' : 'excluded'}`}
      onClick={toggle}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      title={on ? `Remove ${label} from report` : `Add ${label} to report`}
    >{label}</span>
  );
}
