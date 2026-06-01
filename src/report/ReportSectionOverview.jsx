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
  const totalACkW  = rooftopAC + carportAC || p.systemSizeACkW || 0;
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
            <div className="kpi-label">System Size</div>
            <div className="kpi-value">{calc.totalDCkW.toLocaleString()}</div>
            <div className="kpi-unit">
              kW DC
              {(rooftopDC > 0 || carportDC > 0) && (
                <div style={{ marginTop: '4px' }}>
                  {rooftopDC > 0 && <div>{rooftopDC.toLocaleString()} kW rooftop</div>}
                  {carportDC > 0 && <div>{carportDC.toLocaleString()} kW carport</div>}
                </div>
              )}
            </div>
          </div>
        )}
        {p.showGenerationSection && (
          <div className="kpi-card">
            <div className="kpi-label">YR-1 Generation</div>
            <div className="kpi-value">{Math.round(calc.annualMwh).toLocaleString()}</div>
            <div className="kpi-unit">MWh &nbsp;/&nbsp; {Math.round(calc.annualKwh).toLocaleString()} kWh</div>
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
            <div className="kpi-label">Roof Area Used</div>
            <div className="kpi-value">
              {rooftopUsed.toLocaleString()}
              {carportUsed > 0 && <span style={{ fontSize: '0.6em', fontWeight: 'normal', color: '#555' }}> &nbsp;|&nbsp; {carportUsed.toLocaleString()}</span>}
            </div>
            <div className="kpi-unit">
              sq ft rooftop{carportUsed > 0 && <span> &nbsp;|&nbsp; sq ft carport</span>}
              &nbsp;&bull;&nbsp; ~{rooftopTotal > 0 ? Math.round(calc.roofUtil * 100) : 0}% of {rooftopTotal.toLocaleString()} ft² total
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
