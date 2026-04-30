import { makeFmt } from '../utils/formatters';

export default function ReportSectionSavings({ p, calc }) {
  const FMT = makeFmt(p.currency);
  const escRates = p.utilityEscalationRates;

  const scenarioClasses = ['scenario-low', 'scenario-mid', 'scenario-high'];
  const scenarioLabelClasses = ['scenario-label-low', 'scenario-label-mid', 'scenario-label-high'];

  return (
    <div className="section two-col">
      <div className="section-title">Energy Savings Overview</div>

      <div className="card">
        <div className="card-title">Electricity Savings ({p.currency})</div>
        <table className="fin-table">
          <tbody>
            <tr className="sub-header"><td>Annual Utility Bill Impact</td><td>Amount</td></tr>
            <tr><td>Without Solar</td><td>{FMT.usd(calc.yr1TotalUtilBillNoSolar)}</td></tr>
            <tr><td>With Solar PPA</td><td>{FMT.usd(calc.yr1TotalUtilBillWithSolar)}</td></tr>
            <tr className="total-row"><td><strong>Utility Bill Reduction</strong></td><td><strong>{FMT.usd(calc.yr1BillReduction)}</strong></td></tr>
            <tr><td colSpan={2} style={{ fontSize: '11px', color: 'var(--muted)', paddingTop: '4px' }}>${Math.round(calc.yr1BillReductionPerMwh)}/MWh</td></tr>

            <tr className="spacer"><td colSpan={2} /></tr>
            <tr className="sub-header"><td>Year-1 Rate Comparison</td><td>Rate</td></tr>
            <tr><td>Utility Rate (Year 1)</td><td>${Math.round(calc.year1UtilityRate * 1000)}/MWh</td></tr>
            <tr><td>PPA Electricity Rate (Year 1)</td><td>${Math.round(calc.ppaRate * 1000)}/MWh</td></tr>
            <tr className="total-row"><td><strong>Yr-1 Electricity Savings</strong></td><td><strong>{FMT.usd(calc.yr1ElecSavings)}</strong></td></tr>

            <tr className="spacer"><td colSpan={2} /></tr>
            <tr className="sub-header"><td>15-Year Cumulative Savings — Rate Scenarios</td><td>Cumulative</td></tr>
            {calc.scenarios.map((s, i) => (
              <tr key={i} className={`scenario-row ${scenarioClasses[i]}`}>
                <td>{Math.round(s.rate * 100)}% Ann. Utility Escalation</td>
                <td>~{FMT.usd(s.cumSavings[p.ppaTerm - 1])}</td>
              </tr>
            ))}
            <tr><td colSpan={2} style={{ fontSize: '11px', color: 'var(--muted)', padding: '6px 14px' }}>
              Annual module degradation: {(p.degradationRate * 100).toFixed(1)}%/yr &nbsp;&bull;&nbsp; {Math.round((p.ppaEscalationRate || 0) * 100)}% PPA escalation applied
            </td></tr>
          </tbody>
        </table>

        {p.waireEnabled && (
          <div style={{ marginTop: '18px' }}>
            <div className="card-title">WAIRE Points &mdash; 15-Year Term Summary</div>
            <table className="fin-table">
              <tbody>
                <tr className="sub-header"><td>Period</td><td>Points</td><td>Market Value</td></tr>
                <tr>
                  <td>Year 1 <span style={{ fontSize: '0.82em', color: 'var(--muted)' }}>(install + generation)</span></td>
                  <td>{calc.waireYear1TotalPoints.toFixed(0)} pts</td>
                  <td>{FMT.usd(calc.waireYear1MktValueUSD)}</td>
                </tr>
                <tr>
                  <td>Years 2&ndash;{p.ppaTerm} <span style={{ fontSize: '0.82em', color: 'var(--muted)' }}>(~{calc.waireRecurringPoints.toFixed(0)} pts/yr, generation only)</span></td>
                  <td>~{calc.waire15YrOnlyPoints.toFixed(0)} pts</td>
                  <td>~{FMT.usd(calc.waireYrs2to15MktValueUSD)}</td>
                </tr>
                <tr className="total-row">
                  <td><strong>15-Year Total</strong></td>
                  <td><strong>~{calc.waire15YrTotalPoints.toFixed(0)} pts</strong></td>
                  <td><strong>~{FMT.usd(calc.waire15YrTotalMktValueUSD)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Value Offer</div>

        <table className="fin-table">
          <tbody>
            <tr className="sub-header"><td colSpan={2}>PPA Rate</td></tr>
            <tr><td>PPA Rate (Year 1)</td><td>{p.year1PPARateMWh ? `$${p.year1PPARateMWh}/MWh` : `$${Math.round(calc.ppaRate * 1000)}/MWh`}</td></tr>
            <tr><td>Annual Escalation</td><td>{Math.round((p.ppaEscalationRate || 0) * 100)}%/yr</td></tr>
            <tr className="spacer"><td colSpan={2} /></tr>
            <tr className="sub-header"><td colSpan={2} style={{ fontSize: '11px' }}>Each component offered at <strong>{Math.round(p.ppaDiscountRate * 100)}% below Year-1 market value</strong></td></tr>
          </tbody>
        </table>

        <table className="fin-table" style={{ marginTop: '14px' }}>
          <tbody>
            <tr className="sub-header"><td>Value Delivered</td><td>Market Rate</td><td>PPA Price</td></tr>
            <tr>
              <td><strong>Electricity</strong></td>
              <td>${Math.round(calc.year1UtilityRate * 1000)}/MWh</td>
              <td>${Math.round(calc.ppaRate * 1000)}/MWh</td>
            </tr>
            {p.recEnabled && (
              <tr>
                <td><strong>{p.recProgramName}</strong></td>
                <td>${Math.round(p.year1RECValue)}/MWh</td>
                <td>${Math.round(calc.ppaRECPrice)}/MWh</td>
              </tr>
            )}
            {p.waireEnabled && (
              <tr>
                <td><strong>WAIRE Points</strong></td>
                <td>${Math.round(calc.waireYear1MktMwhRate)}/MWh</td>
                <td>${Math.round(calc.waireYear1PpaMwhRate)}/MWh</td>
              </tr>
            )}
          </tbody>
        </table>

        <table className="fin-table" style={{ marginTop: '14px' }}>
          <tbody>
            <tr className="sub-header"><td colSpan={2}>Year 1 Savings Summary</td></tr>
            <tr><td>Electricity Savings</td><td>{FMT.usd(calc.yr1ElecSavings)}</td></tr>
            {p.recEnabled && <tr><td>{p.recProgramName} Savings</td><td>{FMT.usd(calc.yr1RECSavings)}</td></tr>}
            {p.waireEnabled && <tr><td>WAIRE Points Savings</td><td>{FMT.usd(calc.waireYear1SavingsUSD)}</td></tr>}
            <tr className="total-row"><td><strong>Total Year 1 Savings</strong></td><td><strong>{FMT.usd(calc.yr1SubTotal)}</strong></td></tr>
          </tbody>
        </table>

        {p.waireEnabled && (
          <div className="info-box" style={{ marginTop: '16px' }}>
            <strong>What are WAIRE Points?</strong><br />
            WAIRE (Warehouse Actions &amp; Investments to Reduce Emissions) is a compliance program under <strong>SCAQMD Rule 2305</strong>, requiring high-traffic warehouses to earn annual points through clean-air investments &mdash; including on-site solar &mdash; or pay a per-point mitigation fee. This system earns points two ways: a one-time <strong>installation credit</strong> ({calc.waireInstallPoints.toFixed(0)} pts in Year 1) plus annual <strong>generation credits</strong> (~{calc.waireYear1GenPoints.toFixed(0)} pts/yr), for a Year 1 total of {calc.waireYear1TotalPoints.toFixed(0)} pts. This PPA passes those points to {p.tenantName} at a {Math.round(p.ppaDiscountRate * 100)}% discount to the standard fee, directly reducing their annual WAIRE compliance cost.
          </div>
        )}
      </div>
    </div>
  );
}
