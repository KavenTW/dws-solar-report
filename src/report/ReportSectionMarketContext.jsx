export default function ReportSectionMarketContext({ p }) {
  const monetizationRows = (p.marketContextMonetizationRows ?? []).filter(
    r => r.mechanism || r.behaviour
  );
  const implicationRows = (p.marketContextImplicationRows ?? []).filter(
    r => r.priority || r.rationale
  );

  return (
    <div className="section section--page-break">
      {p.marketContextTitle && (
        <div className="section-title">{p.marketContextTitle}</div>
      )}

      {p.marketContextDescription && (
        <p className="market-context-intro">{p.marketContextDescription}</p>
      )}

      {(p.marketContextMonetizationHeader || monetizationRows.length > 0) && (
        <div className="market-context-subsection">
          {p.marketContextMonetizationHeader && (
            <div className="market-context-subsection-title">
              {p.marketContextMonetizationHeader}
            </div>
          )}
          {p.marketContextMonetizationIntro && (
            <p className="market-context-intro">{p.marketContextMonetizationIntro}</p>
          )}
          {monetizationRows.length > 0 && (
            <table className="market-table">
              <thead>
                <tr>
                  <th>Mechanism</th>
                  <th>Behaviour</th>
                </tr>
              </thead>
              <tbody>
                {monetizationRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.mechanism}</td>
                    <td>{row.behaviour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {(p.marketContextImplicationHeader || implicationRows.length > 0) && (
        <div className="market-context-subsection">
          {p.marketContextImplicationHeader && (
            <div className="market-context-subsection-title">
              {p.marketContextImplicationHeader}
            </div>
          )}
          {p.marketContextImplicationIntro && (
            <p className="market-context-intro">{p.marketContextImplicationIntro}</p>
          )}
          {implicationRows.length > 0 && (
            <table className="market-table">
              <thead>
                <tr>
                  <th>Design Priority</th>
                  <th>Rationale</th>
                </tr>
              </thead>
              <tbody>
                {implicationRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.priority}</td>
                    <td>{row.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
