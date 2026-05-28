export default function ReportCover({ p }) {
  const cityShort = p.city.split(',')[0].trim();
  return (
    <>
      <div className="cover-letterhead">
        <img src="/logo.png" alt="Great Circle Solar Management Corporation" className="cover-letterhead-logo" />
        <div className="cover-letterhead-right">
          <span>{p.reportDate}</span>
          <strong>Confidential</strong>
        </div>
      </div>
      <div className="cover">
        <div className="cover-accent-bar" />
        <div className="cover-meta">Power Purchase Agreement &mdash; PPA Proposal</div>
        <h1>{p.address}</h1>
        <div className="cover-subtitle">{p.city} &nbsp;&mdash;&nbsp; {p.reportType}</div>
        <div className="cover-prepared-for">
          Offered to: &nbsp;<span>{p.tenantName}</span>
          &nbsp;<span style={{ opacity: 0.5, fontSize: '13px' }}>
            | Property Owner: {p.clientName}
          </span>
        </div>
      </div>
      <div className="scroll-header">
        <img src="/logo.png" alt="Great Circle Solar" className="scroll-header-logo" />
        <div className="scroll-header-project">
          <strong>{p.address}, {cityShort}</strong>{p.projectName && <span> &nbsp;&mdash;&nbsp; {p.projectName}</span>}
        </div>
      </div>
    </>
  );
}
