import { Fragment } from 'react';
import { PRIORITIZATION_NOTES } from '../../constants/portfolioDefaults';
import { normalize, buildGroupLookup } from './assetGroups';

const pct = (used, total) => (total > 0 ? `${Math.round((used / total) * 100)}%` : '—');
const num = v => Math.round(v || 0).toLocaleString();
const numOrDash = v => (v > 0 ? num(v) : '—');

/**
 * One row per asset: capacity split, generation, area utilization and the
 * prioritization call. Shared by the portfolio-wide Asset Summary page and by
 * each state one-pager, so the two can never disagree.
 *
 * `groups` is [{ key, label, assets }] — the label renders as a band row and
 * is omitted when there is only one group (the state pages).
 * `totals` adds the area-weighted footer row.
 */
export default function AssetSummaryTable({ groups, tiers, showGroupLabels = true, showTotals = true }) {
  const tierOf = buildGroupLookup(tiers);
  const all = groups.flatMap(g => g.assets);
  const sum = fn => all.reduce((s, x) => s + (fn(x) || 0), 0);

  const t = {
    rooftopDC: sum(x => x.p.rooftopSizeDCkW),
    carportDC: sum(x => x.p.carportSizeDCkW),
    totalDC:   sum(x => x.calc.totalDCkW),
    mwh:       sum(x => x.calc.annualMwh),
    roofUsed:  sum(x => x.p.rooftopAreaUsedSqFt),
    roofTotal: sum(x => x.p.rooftopTotalSqFt),
    parkUsed:  sum(x => x.p.carportAreaUsedSqFt),
    parkTotal: sum(x => x.p.carportTotalSqFt),
  };

  return (
    <table className="market-table asset-summary">
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Asset</th>
          <th className="num" style={{ width: '9%' }}>Rooftop kW DC</th>
          <th className="num" style={{ width: '9%' }}>Carport kW DC</th>
          <th className="num" style={{ width: '9%' }}>Total kW DC</th>
          <th className="num" style={{ width: '9%' }}>Yr-1 MWh</th>
          <th className="num" style={{ width: '10%' }}>Est. Roof Utilization</th>
          <th className="num" style={{ width: '10%' }}>Est. Parking Utilization</th>
          <th style={{ width: '24%' }}>Prioritization</th>
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <Fragment key={group.key}>
            {showGroupLabels && (
              <tr className="asset-summary-state">
                <td colSpan={8}>{group.label}</td>
              </tr>
            )}
            {group.assets.map(({ entry, p, calc }) => {
              const name = p.projectName || entry.name;
              const tier = tierOf.get(normalize(name));
              const note = PRIORITIZATION_NOTES[name];
              return (
                <tr key={entry.id}>
                  <td>{name}</td>
                  <td className="num">{numOrDash(p.rooftopSizeDCkW)}</td>
                  <td className="num">{numOrDash(p.carportSizeDCkW)}</td>
                  <td className="num">{num(calc.totalDCkW)}</td>
                  <td className="num">{num(calc.annualMwh)}</td>
                  <td className="num">{pct(p.rooftopAreaUsedSqFt, p.rooftopTotalSqFt)}</td>
                  <td className="num">{pct(p.carportAreaUsedSqFt, p.carportTotalSqFt)}</td>
                  <td>
                    {tier && !showGroupLabels && <div className="prio-tier">{tier}</div>}
                    {note && <div className="prio-note">{note}</div>}
                    {!note && (showGroupLabels || !tier) && '—'}
                  </td>
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
            <td />
          </tr>
        )}
      </tbody>
    </table>
  );
}
