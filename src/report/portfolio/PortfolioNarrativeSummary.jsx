/**
 * The written executive summary — opens the document, ahead of Scope of
 * Engagement. Distinct from PortfolioExecSummary, which is the computed page
 * (KPI strip, portfolio generation, emissions) further in.
 *
 * Seed format, one item per line:
 *   `## Heading`   a sub-heading within the summary
 *   `- text`       a bullet
 *   `-- text`      a sub-bullet
 *   anything else  a paragraph
 *
 * Copy still carrying the unfilled marker prints greyed and italic, so a draft
 * that never received its text cannot leave the building unnoticed.
 *
 * `execActions` is a separate field because it is a table, not prose: one row
 * per line, `Action | Owner | Timing`.
 */
function parse(src) {
  const out = [];
  for (const raw of (src || '').split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('## ')) out.push({ kind: 'head', text: line.slice(3).trim() });
    else if (line.startsWith('-- ')) out.push({ kind: 'sub', text: line.slice(3).trim() });
    else if (line.startsWith('- ')) out.push({ kind: 'bullet', text: line.slice(2).trim() });
    else out.push({ kind: 'para', text: line });
  }
  return out;
}

export default function PortfolioNarrativeSummary({ pf }) {
  const items = parse(pf.execNarrative);
  const actions = (pf.execActions || '')
    .split('\n')
    .map(l => l.split('|').map(c => c.trim()))
    .filter(cells => cells.length >= 2 && cells[0]);

  if (!items.length && !actions.length) return null;

  const unfilled = items.some(i => i.text.startsWith('['));
  const muted = unfilled ? { color: '#9ca3af', fontStyle: 'italic' } : null;

  // Bullets are grouped into one <ul> per run so the list markers and spacing
  // behave; a heading or paragraph closes the run.
  const blocks = [];
  for (const item of items) {
    const last = blocks[blocks.length - 1];
    if (item.kind === 'bullet' || item.kind === 'sub') {
      if (last?.kind === 'list') last.items.push(item);
      else blocks.push({ kind: 'list', items: [item] });
    } else {
      blocks.push(item);
    }
  }

  return (
    <div className="section portfolio-page" id="exec-narrative">
      <div className="section-title">Executive Summary</div>
      <div className="card">
        {blocks.map((block, i) => {
          if (block.kind === 'head') {
            return <div key={i} className="consideration-title exec-head">{block.text}</div>;
          }
          if (block.kind === 'para') {
            return <p key={i} className="portfolio-para" style={muted}>{block.text}</p>;
          }
          return (
            <ul key={i} className="exec-list">
              {block.items.map((it, j) => (
                <li
                  key={j}
                  className={it.kind === 'sub' ? 'exec-sub' : undefined}
                  style={muted}
                >
                  {it.text}
                </li>
              ))}
            </ul>
          );
        })}

        {actions.length > 0 && (
          <>
            <div className="consideration-title exec-head">Action Items</div>
            <table className="market-table exec-actions">
              <thead>
                <tr>
                  <th style={{ width: '54%' }}>Action</th>
                  <th style={{ width: '22%' }}>Owner</th>
                  <th>Timing</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((cells, i) => (
                  <tr key={i}>
                    <td>{cells[0]}</td>
                    <td>{cells[1]}</td>
                    <td>{cells[2] || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="footnote" style={{ marginTop: '6px' }}>
              Owners and timing are proposed, for confirmation with DWS.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
