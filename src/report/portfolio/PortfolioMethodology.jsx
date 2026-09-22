/**
 * Methodology & basis of estimates, then any sections passed as children.
 *
 * Renders as a plain `.section`, not a page of its own: it sits on the Scope of
 * Engagement page, and the two together run onto a second page. The glossary
 * used to live here and now sits with Key Considerations.
 */
export default function PortfolioMethodology({ pf, children }) {
  const paras = (pf.methodology || '').split('\n').filter(Boolean);

  return (
    <div className="section" id="methodology">
      <div className="section-title">Methodology &amp; Basis of Estimates</div>
      <div className="card">
        {paras.map((para, i) => (
          <p key={i} className="portfolio-para" style={i === 0 ? { marginTop: 0 } : undefined}>{para}</p>
        ))}
      </div>
      {children}
    </div>
  );
}
