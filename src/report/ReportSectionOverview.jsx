import { makeFmt } from '../utils/formatters';

export default function ReportSectionOverview({ p, calc }) {
  const FMT = makeFmt(p.currency);
  const refScenario = calc.scenarios[p.referenceScenarioIndex];
  const cum15 = refScenario ? refScenario.cumSavings[p.ppaTerm - 1] : 0;
  const refRatePct = refScenario ? Math.round(refScenario.rate * 100) : '?';

  const rooftopDC  = p.rooftopSizeDCkW || 0;
  const carportDC  = p.carportSizeDCkW || 0;
  const rooftopAC  = p.rooftopSizeACkW || 0;
  const carportAC  = p.carportSizeACkW || 0;
  const rooftopUsed  = p.rooftopAreaUsedSqFt || 0;
  const rooftopTotal = p.rooftopTotalSqFt    || 0;
  const carportUsed  = p.carportAreaUsedSqFt  || 0;
  const carportTotal = p.carportTotalSqFt     || 0;

  return (
    <div className="section">
      <div className="section-title">System Overview</div>
      <div className="kpi-grid">
        {p.showSystemSection && (
          <div className="kpi-card">
            <div className="kpi-label">Maximum Potential System Size</div>
            <div className="kpi-value" style={{ fontSize: '1.5rem' }}>{calc.totalDCkW.toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>kW DC</span></div>
            <div className="kpi-unit">
              <div style={{ marginTop: '2px' }}>
                {rooftopDC > 0 && <div><strong>Rooftop:</strong> {rooftopDC.toLocaleString()} DC{rooftopAC > 0 && ` / ${rooftopAC.toLocaleString()} AC`} kW</div>}
                {carportDC > 0 && <div><strong>Carport:</strong> {carportDC.toLocaleString()} DC{carportAC > 0 && ` / ${carportAC.toLocaleString()} AC`} kW</div>}
              </div>
            </div>
          </div>
        )}
        {p.showGenerationSection && (
          <div className="kpi-card">
            <div className="kpi-label">YR-1 Generation</div>
            <div className="kpi-value">{Math.round(calc.annualMwh).toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>MWh</span></div>
            <div className="kpi-unit">{calc.totalDCkW > 0 ? Math.round(calc.annualMwh / (calc.totalDCkW / 1000)).toLocaleString() : '—'} MWh/MWdc</div>
          </div>
        )}
        {p.showEmissionsSection && (
          <div className="kpi-card">
            <div className="kpi-label">Annual &amp; Lifetime CO₂e Avoided*</div>
            <div className="kpi-value">{Math.round(calc.annualCO2e)} &nbsp;|&nbsp; {FMT.rnd100(calc.lifetimeCO2e).toLocaleString()}</div>
            <div className="kpi-unit">t/yr annual &nbsp;|&nbsp; t lifetime ({p.ppaTerm} yr)*</div>
          </div>
        )}
        {p.showRoofSection && (
          <div className="kpi-card">
            <div className="kpi-label">Solar Footprint</div>
            <div className="kpi-value">{(rooftopUsed + carportUsed).toLocaleString()} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--primary)' }}>ft²</span></div>
            <div className="kpi-unit">
              <div style={{ marginTop: '2px' }}>
                {rooftopUsed > 0 && <div>{rooftopUsed.toLocaleString()} ft² rooftop{rooftopTotal > 0 && <span> (~{Math.round(rooftopUsed / rooftopTotal * 100)}% used)</span>}</div>}
                {carportUsed > 0 && <div>{carportUsed.toLocaleString()} ft² carport{carportTotal > 0 && <span> (~{Math.round(carportUsed / carportTotal * 100)}% used)</span>}</div>}
              </div>
            </div>
          </div>
        )}

        {p.showPPATermsSection && (
          <>
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
              <div className="kpi-label">{p.ppaTerm}-Yr Cumulative Savings</div>
              <div className="kpi-value amber">{FMT.kilo(cum15)}</div>
              <div className="kpi-unit">{p.currency} &bull; electricity savings at {refRatePct}% escalation</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
