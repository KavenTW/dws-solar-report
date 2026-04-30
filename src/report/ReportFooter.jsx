export default function ReportFooter({ p }) {
  const cityShort = p.city.split(',')[0].trim();
  return (
    <footer className="report-footer">
      <img src="/logo.png" alt="Great Circle Solar Management Corporation" className="footer-logo" />
      <div className="footer-text">
        Prepared by: <strong>{p.companyName}</strong> &nbsp;|&nbsp;
        Project: {p.address}, {cityShort}, {p.province} &nbsp;|&nbsp;
        {p.reportDate} &nbsp;|&nbsp; Confidential &mdash; For Tenant Use Only
      </div>
    </footer>
  );
}
