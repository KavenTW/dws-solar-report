/**
 * The written executive summary — a page of prose opening the document, ahead
 * of Scope of Engagement.
 *
 * Added 28 September 2026 as a placeholder: the reviewer is supplying the text.
 * Distinct from PortfolioExecSummary, which is the computed page (KPI strip,
 * portfolio generation, emissions) further in. Seeded copy is deliberately
 * marked so an unfilled page cannot leave the building unnoticed.
 */
export default function PortfolioNarrativeSummary({ pf }) {
  const paras = (pf.execNarrative || '').split('\n').filter(Boolean);
  if (!paras.length) return null;

  const unfilled = paras.some(p => p.startsWith('['));

  return (
    <div className="section portfolio-page" id="exec-narrative">
      <div className="section-title">Executive Summary</div>
      <div className="card">
        {paras.map((para, i) => (
          <p
            key={i}
            className="portfolio-para"
            style={{
              ...(i === 0 ? { marginTop: 0 } : null),
              ...(unfilled ? { color: '#9ca3af', fontStyle: 'italic' } : null),
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
