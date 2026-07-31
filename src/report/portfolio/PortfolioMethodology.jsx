/**
 * Methodology & basis of estimates, plus a short glossary — auditability
 * carried inside the document. Both blocks are editable portfolio text.
 * Glossary format: one entry per line, "Term — definition".
 */
export default function PortfolioMethodology({ pf }) {
  const glossaryRows = pf.glossary
    .split('\n')
    .map(line => {
      const idx = line.indexOf(' — ');
      return idx === -1
        ? { term: line.trim(), def: '' }
        : { term: line.slice(0, idx).trim(), def: line.slice(idx + 3).trim() };
    })
    .filter(r => r.term);

  return (
    <div className="section portfolio-page">
      <div className="section-title">Methodology &amp; Basis of Estimates</div>
      <div className="card" style={{ marginBottom: '16px' }}>
        {pf.methodology.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className="portfolio-para">{para}</p>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Glossary</div>
        <table className="market-table">
          <tbody>
            {glossaryRows.map(({ term, def }) => (
              <tr key={term}>
                <td style={{ width: '30%' }}><strong>{term}</strong></td>
                <td>{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
