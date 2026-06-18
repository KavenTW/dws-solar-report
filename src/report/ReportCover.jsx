export default function ReportCover({ p }) {
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
        <div className="cover-meta">{p.reportType}</div>
        <h1>{p.projectName || p.address}</h1>
        {p.projectName && <div className="cover-subtitle" style={{ opacity: 0.75, fontSize: '1rem', marginBottom: '6px' }}>{p.address}</div>}
        <div className="cover-subtitle">{p.city}</div>
        <div className="cover-prepared-for">
          {(p.tenantName || p.clientName) && (
            <>Issued to: &nbsp;<span>{p.tenantName || p.clientName}</span></>
          )}
        </div>
      </div>
      <div className="scroll-header">
        <img src="/logo.png" alt="Great Circle Solar" className="scroll-header-logo" />
        <div className="scroll-header-project">
          <strong>{p.projectName || p.address}</strong>
        </div>
      </div>
    </>
  );
}
