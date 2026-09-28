/**
 * Glossary — its own page opening the appendices, ahead of Appendix A.
 *
 * It sat with Key Considerations until 24 September 2026, when the reviewer
 * moved it into the appendices. It leads the appendix block rather than
 * trailing it as "Appendix G" because the terms it defines are densest in the
 * asset reports that follow, and because leading keeps the state appendices
 * lettered A–F.
 */
export default function PortfolioGlossary({ pf }) {
  // One entry per line, "Term — definition".
  const rows = (pf.glossary || '')
    .split('\n')
    .map(line => {
      const idx = line.indexOf(' — ');
      return idx === -1
        ? { term: line.trim(), def: '' }
        : { term: line.slice(0, idx).trim(), def: line.slice(idx + 3).trim() };
    })
    .filter(r => r.term);

  if (!rows.length) return null;

  return (
    <div className="section portfolio-page" id="glossary">
      <div className="section-title">Glossary</div>
      <div className="card">
        <table className="market-table">
          <tbody>
            {rows.map(({ term, def }) => (
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
