import DonutChart from './DonutChart';

function barColor(v, max) {
  if (v >= max * 0.90) return '#FFCE02';
  if (v >= max * 0.70) return '#FBA31B';
  if (v >= max * 0.55) return '#005FAB';
  if (v >= max * 0.35) return '#0B468D';
  return '#112877';
}

export default function ReportSectionGeneration({ p, calc }) {
  const maxMwh = Math.max(...calc.monthlyMwh);
  const lbsMwhStr = `${p.gridEmissionsIntensity} lbs CO₂/MWh (${Math.round(p.gridEmissionsIntensity / (2204.62 / 1000))} kg CO₂/MWh)`;

  return (
    <div className="section two-col">
      <div className="section-title">Annual Generation &amp; Emissions</div>

      <div className="card">
        <div className="card-title">Monthly Generation Breakdown</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th className="num">MWh</th>
              <th className="num">% of Annual</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {calc.monthlyMwh.map((v, i) => (
              <tr key={i}>
                <td>{calc.months[i]}</td>
                <td className="num">{Math.round(v).toLocaleString()}</td>
                <td className="num">{Math.round(calc.pct[i])}%</td>
                <td>
                  <div className="bar-cell">
                    <div className="mini-bar-wrap">
                      <div className="mini-bar" style={{ width: `${(v / maxMwh * 100).toFixed(1)}%`, background: barColor(v, maxMwh) }} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td>Year</td>
              <td className="num">{Math.round(calc.annualMwh).toLocaleString()}</td>
              <td className="num">100%</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="card">
          <div className="card-title">Annual Consumption &amp; Solar Offset</div>
          <div className="donut-wrap">
            <div className="donut-canvas-wrap">
              <DonutChart annualMwh={calc.annualMwh} gridImport={calc.gridImport} />
            </div>
            <div className="donut-legend">
              <div className="legend-item"><span className="legend-dot" style={{ background: '#005FAB' }} /><span>Solar ({Math.round(calc.annualMwh).toLocaleString()} MWh)</span></div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#dde8f5' }} /><span>Grid Import ({Math.round(calc.gridImport).toLocaleString()} MWh)</span></div>
              <div className="legend-item" style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>Est. Total Site Load: {Math.round(p.annualSiteLoadMwh).toLocaleString()} MWh/yr</div>
              <div className="legend-item" style={{ fontSize: '13px', color: 'var(--primary-dark)', fontWeight: 700 }}>Solar Offset: ~{Math.round(calc.solarOffset * 100)}%</div>
              <div className="legend-item" style={{ fontSize: '12px', color: 'var(--muted)' }}>Energy Intensity: {Math.round(calc.energyIntensity)} kWh/ft²/yr</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Avoided Grid Emissions</div>
          <table className="fin-table">
            <tbody>
              <tr><td>Jurisdiction</td><td>{p.gridEmissionsRegion}</td></tr>
              <tr><td>Avg Grid Emissions Factor (2026)</td><td>{lbsMwhStr}</td></tr>
              <tr><td>Annual Generation</td><td>{Math.round(calc.annualKwh).toLocaleString()} kWh</td></tr>
              <tr><td>Annual Avoided CO₂e</td><td><strong>{Math.round(calc.annualCO2e)} tonnes</strong></td></tr>
              <tr><td>15-Year Avoided CO₂e</td><td><strong>{(Math.round(calc.lifetimeCO2e / 100) * 100).toLocaleString()} tonnes</strong></td></tr>
              <tr><td>Equiv. {p.equivHomesLabel} Homes / Year</td><td>~{calc.equivHomes} homes</td></tr>
            </tbody>
          </table>
          <div className="info-box" style={{ marginTop: '12px' }}>
            <strong>Source:</strong> {p.gridEmissionsSource}
          </div>
        </div>
      </div>
    </div>
  );
}
