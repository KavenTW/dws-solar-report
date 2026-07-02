export default function PortfolioTitlePage({ pf }) {
  return (
    <div className="portfolio-title-page">
      <div className="cover-letterhead">
        <img src="/logo.png" alt="Great Circle Solar Management Corporation" className="cover-letterhead-logo" />
        <div className="cover-letterhead-right">
          <span>{pf.reportDate}</span>
          <strong>Confidential</strong>
        </div>
      </div>
      <div className="cover portfolio-title-hero">
        <div className="cover-accent-bar" />
        <div className="cover-meta">{pf.reportMeta}</div>
        <h1>{pf.title}</h1>
        <div className="cover-subtitle">{pf.subtitle}</div>
        <div className="cover-prepared-for">
          Prepared for: &nbsp;<span>{pf.preparedFor}</span>
        </div>
        <div className="cover-prepared-for" style={{ marginTop: '4px' }}>
          Prepared by: &nbsp;<span>{pf.preparedBy}</span>
        </div>
      </div>
    </div>
  );
}
