import CashflowChart from './CashflowChart';
import { makeFmt } from '../utils/formatters';

export default function ReportSectionChart({ p, calc }) {
  const FMT = makeFmt(p.currency);
  const refSc = calc.scenarios[p.referenceScenarioIndex];
  const refTotal = refSc ? refSc.cumSavings[p.ppaTerm - 1] : 0;
  const refRatePct = refSc ? Math.round(refSc.rate * 100) : '?';

  const subtitle = `${p.utilityEscalationRates.map(r => (r * 100).toFixed(0) + '%').join(' / ')} utility escalation scenarios — ${((p.ppaEscalationRate || 0) * 100).toFixed(0)}% PPA escalation — ${(p.degradationRate * 100).toFixed(1)}% annual panel degradation`;

  return (
    <div className="section">
      <div className="section-title">{p.ppaTerm}-Year Cumulative Savings Outlook</div>
      <div className="card">
        <div className="card-title">
          Cumulative Electricity Savings vs. Full Utility Rate ({p.currency}) &mdash; {subtitle}
        </div>
        <CashflowChart scenarios={calc.scenarios} labels={calc.savingsLabels} ppaTerm={p.ppaTerm} />
        <div className="chart-scenario-note">
          &bull; {p.ppaTerm}-year cumulative electricity savings at {refRatePct}% utility escalation:{' '}
          <strong style={{ color: 'var(--primary)' }}>{FMT.kilo(refTotal)} {p.currency}</strong>
        </div>
      </div>
    </div>
  );
}
