/**
 * Single document-level disclaimer — replaces the per-asset disclaimers that
 * are suppressed in embedded (portfolio) mode.
 */
export default function PortfolioDisclaimer({ pf }) {
  return (
    <div className="disclaimer portfolio-disclaimer">
      <strong>Disclaimer &amp; Assumptions</strong>
      {pf.disclaimer.split('\n').filter(Boolean).map((para, i) => (
        <p key={i} className="portfolio-disclaimer-para">{para}</p>
      ))}
    </div>
  );
}
