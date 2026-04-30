export default function ReportDisclaimer({ p }) {
  const parts = [
    `This proposal presents preliminary estimates based on desktop analysis, simulation outputs, and publicly available data for ${p.address}, ${p.city}.`,
    `All figures are projections subject to change following site survey, structural engineering review, utility interconnection study, and final equipment selection.`,
    p.gridEmissionsDisclaimer,
    `Utility escalation scenarios are illustrative; actual utility rates may differ.`,
    p.waireEnabled ? p.waireDisclaimer : null,
    `This document does not constitute a binding contract, engineering certification, or financial/legal advice.`,
  ].filter(Boolean).join(' ');

  return (
    <div className="disclaimer">
      <strong>Disclaimer &amp; Assumptions</strong>
      <span>{parts}</span>
    </div>
  );
}
