/**
 * Appendix divider: opens the appendices and lists what each one contains, so
 * a reader arriving at the back of the document can find an asset without
 * returning to the table of contents.
 */
export default function PortfolioAppendixIndex({ states }) {
  const total = states.reduce((n, s) => n + s.assets.length, 0);

  return (
    <div className="section portfolio-page appendix-divider" id="appendices">
      <div className="appendix-eyebrow">Appendices</div>
      <div className="section-title">Individual Asset Reports</div>
      <div className="card">
        <p className="portfolio-para" style={{ marginTop: 0 }}>
          The appendices contain the individual opportunity assessment for each of the {total} assets reviewed, grouped by state in the order the market one-pagers appear. Each assessment sets out the proposed system, layout, estimated generation and avoided emissions, issues for further consideration, and indicative third-party study costs for that asset.
        </p>
        <table className="market-table">
          <thead>
            <tr>
              <th style={{ width: '16%' }}>Appendix</th>
              <th style={{ width: '22%' }}>State</th>
              <th>Assets</th>
            </tr>
          </thead>
          <tbody>
            {states.map(s => (
              <tr key={s.abbr}>
                <td>Appendix {s.letter}</td>
                <td>{s.name}</td>
                <td>{s.assets.join(' · ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
