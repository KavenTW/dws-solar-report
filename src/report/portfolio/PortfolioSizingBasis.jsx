/**
 * Net Metering & System Sizing — renders on the Next Steps page, directly
 * beneath the on-site load consideration. It sat on the Methodology page until
 * 24 September 2026, when the reviewer tied it to the load analysis: the two
 * are the same argument from opposite sides.
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
    <div className="sizing-basis-block" id="sizing-basis" style={{ marginTop: '12px' }}>
      <div className="card" style={{ marginBottom: '6px' }}>
        <div className="card-title">Net Metering &amp; System Sizing</div>
        {paras.map((para, i) => (
          <p key={i} className="portfolio-para" style={i === 0 ? { marginTop: 0 } : undefined}>{para}</p>
        ))}
      </div>
    </div>
  );
}
