import MonthlyProductionChart from './MonthlyProductionChart';

export default function ReportSectionGeneration({ p, calc }) {
  const lbsMwhStr = `${p.gridEmissionsIntensity} lbs CO₂/MWh (${Math.round(p.gridEmissionsIntensity / (2204.62 / 1000))} kg CO₂/MWh)`;

  return (
    <div className="section">
      <div className="section-title">Annual Generation &amp; Emissions</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {p.showGenerationSection && (
          <div className="card">
            <div className="card-title">Monthly Production Distribution</div>
            <div style={{ marginBottom: '10px', fontSize: '13px', color: 'var(--muted)' }}>
              Annual Total: <strong style={{ color: 'var(--primary-dark)' }}>{Math.round(calc.annualMwh).toLocaleString()} MWh</strong>
            </div>
            <div className="production-chart-wrap" style={{ height: '200px' }}>
              <MonthlyProductionChart monthlyMwh={calc.monthlyMwh} />
            </div>
          </div>
        )}

        {p.showEmissionsSection && (
          <div className="card">
            <div className="card-title">Avoided Grid Emissions</div>
            <table className="fin-table">
              <tbody>
                {p.gridEmissionsRegion && <tr><td>Jurisdiction</td><td>{p.gridEmissionsRegion}</td></tr>}
                <tr><td>Avg Grid Emissions Factor ({new Date().getFullYear()})*</td><td>{lbsMwhStr}</td></tr>
                <tr><td>Annual Generation</td><td>{Math.round(calc.annualMwh).toLocaleString()} MWh</td></tr>
                <tr><td>Annual Avoided CO₂e</td><td><strong>{Math.round(calc.annualCO2e)} tonnes</strong></td></tr>
                <tr><td>{p.ppaTerm}-Year Avoided CO₂e</td><td><strong>{(Math.round(calc.lifetimeCO2e / 100) * 100).toLocaleString()} tonnes</strong></td></tr>
                <tr><td>Equiv. {p.equivHomesLabel} Homes / Year**</td><td>~{calc.equivHomes} homes</td></tr>
              </tbody>
            </table>
            {p.gridEmissionsSource && (
              <div className="info-box" style={{ marginTop: '12px' }}>
                <strong>Source:</strong> {p.gridEmissionsSource}
              </div>
            )}
            <div className="footnote" style={{ marginTop: '10px' }}>
              * CO₂e avoidance estimates are based on the applicable regional grid emissions factor from {p.gridEmissionsSource || 'U.S. EPA eGRID / applicable grid authority'}. Figures assume full displacement of grid electricity by solar generation and include module degradation over the {p.ppaTerm}-year term. Actual avoided emissions may vary with changes to grid fuel mix, system output, and site consumption patterns.
            </div>
            <div className="footnote" style={{ marginTop: '6px' }}>
              ** Equivalent homes calculation based on U.S. EIA average annual household electricity consumption (~10.6 MWh/yr).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
