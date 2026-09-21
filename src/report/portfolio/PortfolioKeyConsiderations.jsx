/**
 * Key Considerations — document-level matters that apply across the portfolio.
 * Site-specific points belong in each asset's "Issues for Further
 * Consideration" section, not here. Lines are "Heading | detail".
 */
export default function PortfolioKeyConsiderations({ pf }) {
  const lines = (pf.keyConsiderations || '').split('\n').map(s => s.trim()).filter(Boolean);

  return (
    <div className="section portfolio-page" id="key-considerations">
      <div className="section-title">Key Considerations</div>
      <div className="card">
        <p className="portfolio-para" style={{ marginTop: 0 }}>{pf.keyConsiderationsIntro}</p>
        {lines.map((line, i) => {
          const [head, ...rest] = line.split('|');
          const detail = rest.join('|').trim();
          return (
            <div key={i} className="consideration-block">
              <div className="consideration-title">{head.trim()}</div>
              {detail && <p className="portfolio-para" style={{ margin: 0 }}>{detail}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
