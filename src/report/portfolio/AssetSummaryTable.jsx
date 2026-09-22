import { Fragment } from 'react';
import { normalize, buildGroupLookup } from './assetGroups';

const num = v => Math.round(v || 0).toLocaleString();
const numOrDash = v => (v > 0 ? num(v) : '—');
// The asset reports print lifetime CO₂e rounded to the nearest 100 tonnes.
// Rounding the same way here keeps the summary tied to the appendix a reader
// checks it against.
const co2Lifetime = v => Math.round((v || 0) / 100) * 100;

/**
 * One row per asset: capacity split, generation and avoided emissions. Shared
 * by the portfolio-wide Asset Summary page and by each state one-pager, so the
 * two can never disagree.
 *
 * Where the group renders as a band row across the table (showGroupLabels), the
 * prioritization column is dropped: repeating the group on every row under its
 * own heading is dead width. The state pages have no band row, so there the
 * column carries the group.
 *
 * `groups` is [{ key, label, assets }] — the label renders as a band row and
 * is omitted when there is only one group (the state pages).
 * `showTotals` adds the footer row.
 */
export default function AssetSummaryTable({ groups, tiers, showGroupLabels = true, showTotals = true, showState = false }) {
  const tierOf = buildGroupLookup(tiers);
  const showGroupColumn = !showGroupLabels;
  const colCount = (showGroupColumn ? 8 : 7) + (showState ? 1 : 0);
  const all = groups.flatMap(g => g.assets);
  // Capacity columns total the ROUNDED row values, so the printed column adds
  // up to the printed total. Summing the raw values first and rounding once is
  // marginally more accurate but leaves the column short by a kilowatt or two,
  // which is what a reader checking the arithmetic actually sees.
  const sum = fn => all.reduce((s, x) => s + Math.round(fn(x) || 0), 0);

  const t = {
    rooftopDC: sum(x => x.p.rooftopSizeDCkW),
    carportDC: sum(x => x.p.carportSizeDCkW),
    totalDC:   sum(x => x.calc.totalDCkW),
    mwh:       sum(x => x.calc.annualMwh),
    annualCO2: sum(x => x.calc.annualCO2e),
    lifeCO2:   all.reduce((s, x) => s + co2Lifetime(x.calc.lifetimeCO2e), 0),
  };

  // Every asset in this portfolio runs a 25-year term; label it only when they
  // agree, so a mixed set never claims a term it does not have. Kept short:
  // "Lifetime CO₂e (25 yr, t)" wraps to three lines in this column and strands
  // the closing "t)" on a line of its own.
  const terms = [...new Set(all.map(x => x.p.ppaTerm).filter(Boolean))];
  const lifeLabel = terms.length === 1 ? `${terms[0]}-Yr CO₂e (t)` : 'Lifetime CO₂e (t)';

  return (
    <table className="market-table asset-summary">
      <thead>
        <tr>
          <th style={{ width: showGroupColumn ? '20%' : (showState ? '24%' : '28%') }}>Asset</th>
          {showState && <th style={{ width: '8%' }}>State</th>}
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Rooftop kW DC</th>
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Carport kW DC</th>
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Total kW DC</th>
          <th className="num" style={{ width: showGroupColumn ? '9%' : '12%' }}>Yr-1 MWh</th>
          <th className="num" style={{ width: showGroupColumn ? '10%' : '12%' }}>Annual CO₂e (t)</th>
          <th className="num" style={{ width: showGroupColumn ? '10%' : '12%' }}>{lifeLabel}</th>
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
                  {showState && <td>{p.province || '—'}</td>}
                  <td className="num">{numOrDash(p.rooftopSizeDCkW)}</td>
                  <td className="num">{numOrDash(p.carportSizeDCkW)}</td>
                  <td className="num">{num(calc.totalDCkW)}</td>
                  <td className="num">{num(calc.annualMwh)}</td>
                  <td className="num">{num(calc.annualCO2e)}</td>
                  <td className="num">{co2Lifetime(calc.lifetimeCO2e).toLocaleString()}</td>
                  {showGroupColumn && <td>{tier ? <span className="prio-tier">{tier}</span> : '—'}</td>}
                </tr>
              );
            })}
          </Fragment>
        ))}
        {showTotals && (
          <tr className="asset-summary-total">
            <td>Total — {all.length} asset{all.length !== 1 ? 's' : ''}</td>
            {showState && <td />}
            <td className="num">{num(t.rooftopDC)}</td>
            <td className="num">{num(t.carportDC)}</td>
            <td className="num">{num(t.totalDC)}</td>
            <td className="num">{num(t.mwh)}</td>
            <td className="num">{num(t.annualCO2)}</td>
            <td className="num">{t.lifeCO2.toLocaleString()}</td>
            {showGroupColumn && <td />}
          </tr>
        )}
      </tbody>
    </table>
  );
}
