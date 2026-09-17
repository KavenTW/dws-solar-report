/**
 * Net Metering & System Sizing — PLACEHOLDER SECTION, drafted for GCS to expand.
 *
 * Why it exists: the capacities in this document are maximum buildable, because
 * that is what Scope 1B asked for. Net metering in most of these states caps a
 * system at the host's own consumption, so any site later recommended for
 * feasibility has to be re-sized against confirmed on-site load. Saying so here
 * keeps the document's own numbers honest without overstepping the scope.
 */
export default function PortfolioSizingBasis({ pf }) {
  const paras = (pf.sizingBasis || '').split('\n').filter(Boolean);

  return (
    <div className="section portfolio-page">
      <div className="section-title">Net Metering &amp; System Sizing</div>
      <div className="card">
        {paras.map((para, i) => (
          <p key={i} className="portfolio-para" style={i === 0 ? { marginTop: 0 } : undefined}>{para}</p>
        ))}
      </div>
    </div>
  );
}
