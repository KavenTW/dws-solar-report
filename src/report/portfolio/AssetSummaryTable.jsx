import { Fragment } from 'react';
import { normalize, buildGroupLookup } from './assetGroups';

const pct = (used, total) => (total > 0 ? `${Math.round((used / total) * 100)}%` : '—');
const num = v => Math.round(v || 0).toLocaleString();
const numOrDash = v => (v > 0 ? num(v) : '—');

/**
 * One row per asset: capacity split, generation and area utilization. Shared by
 * the portfolio-wide Asset Summary page and by each state one-pager, so the two
 * can never disagree.
 *
 * Where the group renders as a band row across the table (showGroupLabels), the
 * prioritization column is dropped: repeating the group on every row under its
 * own heading is dead width. The state pages have no band row, so there the
 * column carries the group.
 *
 * `groups` is [{ key, label, assets }] — the label renders as a band row and
 * is omitted when there is only one group (the state pages).
 * `totals` adds the area-weighted footer row.
 */
export default function AssetSummaryTable({ groups, tiers, showGroupLabels = true, showTotals = true }) {
  const tierOf = buildGroupLookup(tiers);
  const showGroupColumn = !showGroupLabels;
  const colCount = showGroupColumn ? 8 : 7;
  const all = groups.flatMap(g => g.assets);
  // Capacity columns total the ROUNDED row values, so the printed column adds
  // up to the printed total. Summing the raw values first and rounding once is
  // marginally more accurate but leaves the column short by a kilowatt or two,
  // which is what a reader checking the arithmetic actually sees.
  const sum = fn => all.reduce((s, x) => s + Math.round(fn(x) || 0), 0);
  // Areas stay unrounded: they feed a percentage, not a printed column.
  const sumRaw = fn => all.reduce((s, x) => s + (fn(x) || 0), 0);

  const t = {
    rooftopDC: sum(x => x.p.rooftopSizeDCkW),
    carportDC: sum(x => x.p.carportSizeDCkW),
    totalDC:   sum(x => x.calc.totalDCkW),
    mwh:       sum(x => x.calc.annualMwh),
    roofUsed:  sumRaw(x => x.p.rooftopAreaUsedSqFt),
    roofTotal: sumRaw(x => x.p.rooftopTotalSqFt),
    parkUsed:  sumRaw(x => x.p.carportAreaUsedSqFt),
    parkTotal: sumRaw(x => x.p.carportTotalSqFt),
  };

  return (
    <table className="market-table asset-summary">
      <thead>
        <tr>
          <th style={{ width: showGroupColumn ? '20%' : '28%' }}>Asset</th>
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Rooftop kW DC</th>
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Carport kW DC</th>
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Total kW DC</th>
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Yr-1 MWh</th>
          <th className="num" style={{ width: showGroupColumn ? '10%' : '12%' }}>Est. Roof Utilization</th>
          <th className="num" style={{ width: showGroupColumn ? '10%' : '12%' }}>Est. Parking Utilization</th>
          {showGroupColumn && <th style={{ width: '24%' }}>Prioritization</th>}
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <Fragment key={group.key}>
            {showGroupLabels && (
              <tr className="asset-summary-state">
                <td colSpan={colCount}>{group.label}</td>
              </tr>
            )}
            {group.assets.map(({ entry, p, calc }) => {
              const name = p.projectName || entry.name;
              const tier = tierOf.get(normalize(name));
              return (
                <tr key={entry.id}>
                  <td>{name}</td>
                  <td className="num">{numOrDash(p.rooftopSizeDCkW)}</td>
                  <td className="num">{numOrDash(p.carportSizeDCkW)}</td>
                  <td className="num">{num(calc.totalDCkW)}</td>
                  <td className="num">{num(calc.annualMwh)}</td>
                  <td className="num">{pct(p.rooftopAreaUsedSqFt, p.rooftopTotalSqFt)}</td>
                  <td className="num">{pct(p.carportAreaUsedSqFt, p.carportTotalSqFt)}</td>
                  {showGroupColumn && <td>{tier ? <span className="prio-tier">{tier}</span> : '—'}</td>}
                </tr>
              );
            })}
          </Fragment>
        ))}
        {showTotals && (
          <tr className="asset-summary-total">
            <td>Total — {all.length} asset{all.length !== 1 ? 's' : ''}</td>
            <td className="num">{num(t.rooftopDC)}</td>
            <td className="num">{num(t.carportDC)}</td>
            <td className="num">{num(t.totalDC)}</td>
            <td className="num">{num(t.mwh)}</td>
            <td className="num">{pct(t.roofUsed, t.roofTotal)}</td>
            <td className="num">{pct(t.parkUsed, t.parkTotal)}</td>
            {showGroupColumn && <td />}
          </tr>
        )}
      </tbody>
    </table>
  );
}
