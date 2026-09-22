/**
 * Scope of engagement — reproduced from Scope 1B of the executed advisory
 * agreement, followed by Methodology and Net Metering, which render as
 * children on the same page. Items are written "Heading | detail" per line; the heading before
 * the pipe renders in bold. Editable, but should only be changed against the
 * agreement itself.
 */
export default function PortfolioScope({ pf, children }) {
  const bullets = text => (text || '').split('\n').map(s => s.trim()).filter(Boolean);

  const item = (line, i) => {
    const [head, ...rest] = line.split('|');
    const detail = rest.join('|').trim();
    return detail
      ? <li key={i}><strong>{head.trim()}</strong> — {detail}</li>
      : <li key={i}>{head.trim()}</li>;
  };

  // The page wrapper is not itself a `.section`: methodology and net metering
  // render inside it as siblings, each keeping its own break-inside guard, so
  // the run flows onto a second page without any one section splitting.
  return (
    <div className="portfolio-page" id="scope">
      <div className="section">
        <div className="section-title">Scope of Engagement</div>
        <div className="card">
          <p className="portfolio-para" style={{ marginTop: 0 }}>{pf.scopeIntro}</p>
          <ul className="scope-list">{bullets(pf.scopeItems).map(item)}</ul>
        </div>
      </div>
      {children}
    </div>
  );
}
