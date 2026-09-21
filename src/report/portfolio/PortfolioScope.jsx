/**
 * Scope of engagement — reproduced from Scope 1B of the executed advisory
 * agreement. Items are written "Heading | detail" per line; the heading before
 * the pipe renders in bold. Editable, but should only be changed against the
 * agreement itself.
 */
export default function PortfolioScope({ pf }) {
  const bullets = text => (text || '').split('\n').map(s => s.trim()).filter(Boolean);

  const item = (line, i) => {
    const [head, ...rest] = line.split('|');
    const detail = rest.join('|').trim();
    return detail
      ? <li key={i}><strong>{head.trim()}</strong> — {detail}</li>
      : <li key={i}>{head.trim()}</li>;
  };

  return (
    <div className="section portfolio-page" id="scope">
      <div className="section-title">Scope of Engagement</div>
      <div className="card">
        <p className="portfolio-para" style={{ marginTop: 0 }}>{pf.scopeIntro}</p>
        <ul className="scope-list">{bullets(pf.scopeItems).map(item)}</ul>

        <div className="state-block-title" style={{ marginTop: '14px' }}>Information Requirements</div>
        <p className="portfolio-para" style={{ marginTop: 0 }}>{pf.scopeInfoIntro}</p>
        <ul className="scope-list">{bullets(pf.scopeInfoItems).map(item)}</ul>
      </div>
    </div>
  );
}
