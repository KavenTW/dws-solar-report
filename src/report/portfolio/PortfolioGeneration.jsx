import MonthlyProductionChart from '../MonthlyProductionChart';

/**
 * Portfolio-wide generation and avoided emissions — the per-asset "Annual
 * Generation & Emissions" block summed across every included asset, ignoring
 * prioritization grouping.
 *
 * No jurisdiction, grid factor or eGRID subregion row: the portfolio spans six
 * grid subregions with different factors, so a single figure would misstate
 * every asset. The per-asset reports carry their own factor and source, and the
 * methodology page names eGRID.
 *
 * Totals round per asset before summing, matching the Portfolio Asset Summary
 * and the KPI strip — the three must state the same number.
 */
export default function PortfolioGeneration({ projects }) {
  const ok = projects.filter(x => x.calc);

  const monthlyMwh = Array.from({ length: 12 }, (_, i) =>
    ok.reduce((s, x) => s + (x.calc.monthlyMwh?.[i] || 0), 0));

  const annualMwh = ok.reduce((s, x) => s + Math.round(x.calc.annualMwh || 0), 0);
  const annualCO2e = ok.reduce((s, x) => s + Math.round(x.calc.annualCO2e || 0), 0);
  // The asset reports print lifetime CO₂e to the nearest 100 tonnes; match them.
  const lifetimeCO2e = ok.reduce((s, x) => s + Math.round((x.calc.lifetimeCO2e || 0) / 100) * 100, 0);
  const equivHomes = ok.reduce((s, x) => s + Math.round(x.calc.equivHomes || 0), 0);

  // Label the term only when every asset shares one.
  const terms = [...new Set(ok.map(x => x.p.ppaTerm).filter(Boolean))];
  const termLabel = terms.length === 1 ? `${terms[0]}-Year` : 'Lifetime';

  return (
    <>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-title">Monthly Production Distribution — All Assets</div>
        <div style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--muted)' }}>
          Annual Total: <strong style={{ color: 'var(--primary-dark)' }}>{annualMwh.toLocaleString()} MWh</strong>
          &nbsp;&bull;&nbsp; {ok.length} asset{ok.length !== 1 ? 's' : ''} combined &bull; HelioScope / PVsyst simulation basis
        </div>
        {/* 150px, not the 200px of the per-asset charts: the executive summary
            also carries the KPI strip, the emissions table and the narrative, and
            at 200px the section runs past the page. The wrapper height is what
            Chart.js draws to, so it must be the same on screen and in print. */}
        <div className="production-chart-wrap" style={{ height: '150px' }}>
          <MonthlyProductionChart monthlyMwh={monthlyMwh} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-title">Avoided Grid Emissions — All Assets</div>
        <table className="fin-table">
          <tbody>
            <tr><td>Annual Generation</td><td>{annualMwh.toLocaleString()} MWh</td></tr>
            <tr><td>Annual Avoided CO₂e</td><td><strong>{annualCO2e.toLocaleString()} tonnes</strong></td></tr>
            <tr><td>{termLabel} Avoided CO₂e</td><td><strong>{lifetimeCO2e.toLocaleString()} tonnes</strong></td></tr>
            <tr><td>Equiv. U.S. Homes / Year*</td><td>~{equivHomes.toLocaleString()} homes</td></tr>
          </tbody>
        </table>
        <div className="footnote" style={{ marginTop: '10px' }}>
          Avoided emissions apply each asset&rsquo;s own regional grid emissions factor to its modelled generation and are summed across the portfolio; the factors and sources are stated in the individual asset reports. Figures assume full displacement of grid electricity by solar generation and include module degradation over the term.
        </div>
        <div className="footnote" style={{ marginTop: '6px' }}>
          * Equivalent homes calculation based on U.S. EIA average annual household electricity consumption (10,632 kWh/yr).
        </div>
      </div>
    </>
  );
}
