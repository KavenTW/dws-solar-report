import { Fragment } from 'react';
import { STATE_ORDER } from '../../constants/portfolioDefaults';

/** "Tier 1 — Advance" → "Tier 1"; falls back to the full name. */
const tierShortName = name => (name || '').split('—')[0].trim() || name;

/** Asset names are typed by hand in the tier fields — match forgivingly. */
const normalise = s => (s || '').toLowerCase().replace(/\s+/g, ' ').replace(/ solar$/, '').trim();

const pct = (used, total) => (total > 0 ? `${Math.round((used / total) * 100)}%` : '—');
const num = v => Math.round(v || 0).toLocaleString();
const numOrDash = v => (v > 0 ? num(v) : '—');

/**
 * Portfolio Asset Summary: every included asset on one page, so the whole
 * portfolio can be compared without turning to the individual reports.
 * All figures are computed from the same `calc` used by the asset reports —
 * nothing here is separately maintained. Tier is looked up from the editable
 * prioritisation tiers on the preceding page.
 */
export default function PortfolioAssetSummary({ pf, projects }) {
  const tierOf = new Map();
  for (const tier of pf.tiers) {
    for (const asset of (tier.assets || '').split(';')) {
      const key = normalise(asset);
      if (key) tierOf.set(key, tierShortName(tier.name));
    }
  }

  const ok = projects.filter(x => x.calc);
  const rows = STATE_ORDER
    .map(abbr => ({ abbr, name: pf.states[abbr].name, assets: ok.filter(x => x.p.province === abbr) }))
    .filter(g => g.assets.length > 0);

  const sum = (fn) => ok.reduce((s, x) => s + (fn(x) || 0), 0);
  const totals = {
    rooftopDC: sum(x => x.p.rooftopSizeDCkW),
    carportDC: sum(x => x.p.carportSizeDCkW),
    totalDC: sum(x => x.calc.totalDCkW),
    mwh: sum(x => x.calc.annualMwh),
    roofUsed: sum(x => x.p.rooftopAreaUsedSqFt),
    roofTotal: sum(x => x.p.rooftopTotalSqFt),
    parkUsed: sum(x => x.p.carportAreaUsedSqFt),
    parkTotal: sum(x => x.p.carportTotalSqFt),
    poi: sum(x => x.p.pointsOfInterconnection),
  };

  return (
    <div className="section portfolio-page">
      <div className="section-title">Portfolio Asset Summary</div>
      <div className="card">
        <table className="market-table asset-summary">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Asset</th>
              <th className="num" style={{ width: '9%' }}>Rooftop kW DC</th>
              <th className="num" style={{ width: '9%' }}>Carport kW DC</th>
              <th className="num" style={{ width: '10%' }}>Total kW DC</th>
              <th className="num" style={{ width: '10%' }}>Yr-1 MWh</th>
              <th className="num" style={{ width: '11%' }}>Roof Utilisation</th>
              <th className="num" style={{ width: '11%' }}>Parking Utilisation</th>
              <th className="num" style={{ width: '6%' }}>POI</th>
              <th className="num" style={{ width: '9%' }}>Tier</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(group => (
              <Fragment key={group.abbr}>
                <tr className="asset-summary-state">
                  <td colSpan={9}>{group.name}</td>
                </tr>
                {group.assets.map(({ entry, p, calc }) => (
                  <tr key={entry.id}>
                    <td>{p.projectName || entry.name}</td>
                    <td className="num">{numOrDash(p.rooftopSizeDCkW)}</td>
                    <td className="num">{numOrDash(p.carportSizeDCkW)}</td>
                    <td className="num">{num(calc.totalDCkW)}</td>
                    <td className="num">{num(calc.annualMwh)}</td>
                    <td className="num">{pct(p.rooftopAreaUsedSqFt, p.rooftopTotalSqFt)}</td>
                    <td className="num">{pct(p.carportAreaUsedSqFt, p.carportTotalSqFt)}</td>
                    <td className="num">{p.pointsOfInterconnection || '—'}</td>
                    <td className="num">{tierOf.get(normalise(p.projectName || entry.name)) || '—'}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
            <tr className="asset-summary-total">
              <td>Portfolio total — {ok.length} asset{ok.length !== 1 ? 's' : ''}</td>
              <td className="num">{num(totals.rooftopDC)}</td>
              <td className="num">{num(totals.carportDC)}</td>
              <td className="num">{num(totals.totalDC)}</td>
              <td className="num">{num(totals.mwh)}</td>
              <td className="num">{pct(totals.roofUsed, totals.roofTotal)}</td>
              <td className="num">{pct(totals.parkUsed, totals.parkTotal)}</td>
              <td className="num">{totals.poi || '—'}</td>
              <td className="num">—</td>
            </tr>
          </tbody>
        </table>
        <div className="footnote" style={{ marginTop: '8px' }}>
          Rooftop and carport capacities are the maximum buildable layouts identified at pre-feasibility and are subject to the site load and structural analysis described in Next Steps. Utilisation is the area occupied by the proposed layout as a share of the total measured area; portfolio utilisation is area-weighted. POI is the estimated number of points of interconnection (see Glossary), a key driver of electrical feasibility cost. Tier reflects the directional prioritisation proposed on the preceding page. Calculation bases are set out in Methodology &amp; Basis of Estimates.
        </div>
      </div>
    </div>
  );
}
