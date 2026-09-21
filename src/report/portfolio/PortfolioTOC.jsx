/**
 * Table of contents. Browsers cannot compute print page numbers, so each row
 * carries a small editable field. Fill them with the "Estimate TOC page
 * numbers" button in the editor, or by hand. Values persist in the portfolio
 * state and are kept across a text reset.
 */
export default function PortfolioTOC({ pf, entries, setTocPage }) {
  return (
    <div className="section portfolio-page">
      <div className="section-title">Table of Contents</div>
      <div className="card">
        <table className="toc-table">
          <tbody>
            {entries.map(({ slug, label, level }) => (
              <tr key={slug} className={level === 1 ? 'toc-row-sub' : 'toc-row-top'}>
                <td className="toc-label" style={level === 1 ? { paddingLeft: '28px' } : undefined}>{label}</td>
                <td className="toc-dots" aria-hidden="true" />
                <td className="toc-page">
                  <input
                    type="text"
                    className="toc-page-input"
                    value={pf.tocPages[slug] || ''}
                    onChange={e => setTocPage(slug, e.target.value)}
                    aria-label={`Page number for ${label}`}
                    placeholder="–"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
