import { makeFmt } from '../utils/formatters';

export default function ReportSectionOverview({ p, calc }) {
  const FMT = makeFmt(p.currency);
  const refScenario = calc.scenarios[p.referenceScenarioIndex];
  const cum15 = refScenario ? refScenario.cumSavings[p.ppaTerm - 1] : 0;
  const refRatePct = refScenario ? Math.round(refScenario.rate * 100) : '?';

  return (
    <div className="section">
      <div className="section-title">System Overview</div>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">System Size</div>
          <div className="kpi-value">{p.systemSizeDCkW.toLocaleString()}</div>
          <div className="kpi-unit">kW DC &nbsp;/&nbsp; {p.systemSizeACkW.toLocaleString()} kW AC</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">YR-1 Generation</div>
          <div className="kpi-value">{Math.round(calc.annualMwh).toLocaleString()}</div>
          <div className="kpi-unit">MWh &nbsp;/&nbsp; {Math.round(calc.annualKwh).toLocaleString()} kWh</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Annual &amp; Lifetime CO₂e Avoided</div>
          <div className="kpi-value">{Math.round(calc.annualCO2e)} &nbsp;|&nbsp; {FMT.rnd100(calc.lifetimeCO2e).toLocaleString()}</div>
          <div className="kpi-unit">t/yr annual &nbsp;|&nbsp; t lifetime ({p.ppaTerm} yr)</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Roof Area Used</div>
          <div className="kpi-value">{p.roofUsedSqFt.toLocaleString()}</div>
          <div className="kpi-unit">sq ft &nbsp;&bull;&nbsp; ~{Math.round(calc.roofUtil * 100)}% of {p.roofTotalSqFt.toLocaleString()} ft² total roof</div>
        </div>

        <div className="kpi-divider">PPA Savings Summary</div>

        <div className="kpi-card accent">
          <div className="kpi-label">Yr-1 Electricity Savings</div>
          <div className="kpi-value amber">{FMT.usd(calc.yr1ElecSavings)}</div>
          <div className="kpi-unit">{p.currency} &bull; {Math.round(p.ppaDiscountRate * 100)}% savings vs. full utility rate</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">PPA Term</div>
          <div className="kpi-value">{p.ppaTerm}</div>
          <div className="kpi-unit">years &nbsp;&bull;&nbsp; fixed PPA rate</div>
        </div>
        <div className="kpi-card accent2">
          <div className="kpi-label">15-Yr Cumulative Savings</div>
          <div className="kpi-value amber">{FMT.kilo(cum15)}</div>
          <div className="kpi-unit">{p.currency} &bull; electricity savings at {refRatePct}% escalation</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Module Count</div>
          <div className="kpi-value">~{calc.moduleCount.toLocaleString()}</div>
          <div className="kpi-unit">&times; {p.moduleWp} W panels (est.)</div>
        </div>
      </div>
    </div>
  );
}
