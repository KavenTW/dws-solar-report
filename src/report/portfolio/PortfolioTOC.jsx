/**
 * Table of contents. Browsers cannot compute print page numbers, so each row
 * carries a small editable field: do one test print, fill the numbers in, then
 * print final. Values persist in the portfolio state.
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
        <div className="footnote no-print" style={{ marginTop: '10px' }}>
          Page numbers are entered manually: run one test print, note the page each section lands on, fill these in, then print the final document.
        </div>
      </div>
    </div>
  );
}
