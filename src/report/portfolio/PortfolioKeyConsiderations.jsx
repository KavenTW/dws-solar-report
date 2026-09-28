/**
 * Key Considerations — document-level matters that apply across the portfolio.
 * Site-specific points belong in each asset's "Issues for Further
 * Consideration" section, not here. Lines are "Heading | detail".
 *
 * Renders as a block on the Next Steps page rather than a page of its own; the
 * reviewer combined the two on 24 September 2026. The glossary that used to
 * sit beneath it now opens the appendices.
 *
 * `afterLoadAnalysis` is dropped in directly beneath the on-site load
 * consideration — Net Metering & System Sizing makes the same argument from
 * the market side, so the two belong together. If no consideration mentions
 * load, it renders at the end of the block rather than disappearing.
 */
export default function PortfolioKeyConsiderations({ pf, afterLoadAnalysis = null }) {
  const lines = (pf.keyConsiderations || '').split('\n').map(s => s.trim()).filter(Boolean);
  const loadIdx = lines.findIndex(l => /load/i.test(l.split('|')[0]));
  const anchor = loadIdx === -1 ? lines.length - 1 : loadIdx;

  return (
    <div className="section" id="key-considerations">
      <div className="section-title">Key Considerations</div>
      <div className="card">
        <p className="portfolio-para" style={{ marginTop: 0 }}>{pf.keyConsiderationsIntro}</p>
        {lines.map((line, i) => {
          const [head, ...rest] = line.split('|');
          const detail = rest.join('|').trim();
          return (
            <div key={i}>
              <div className="consideration-block">
                <div className="consideration-title">{head.trim()}</div>
                {detail && <p className="portfolio-para" style={{ margin: 0 }}>{detail}</p>}
              </div>
              {i === anchor && afterLoadAnalysis}
            </div>
          );
        })}
      </div>
    </div>
  );
}
