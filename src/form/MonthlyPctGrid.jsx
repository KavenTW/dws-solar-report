import { useProject } from '../context/ProjectContext';
import { monthlyPctSum } from '../constants/validation';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function MonthlyPctGrid() {
  const { state, dispatch } = useProject();
  const { monthlyPct } = state.project;
  const sum = monthlyPctSum(monthlyPct);
  const isOk = Math.abs(sum - 100) <= 0.2;

  return (
    <div style={{ gridColumn: '1 / -1' }}>
      <div className="monthly-grid">
        {MONTHS.map((m, i) => (
          <div key={m} className="monthly-cell">
            <label>{m}</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={monthlyPct[i]}
              onChange={e => dispatch({
                type: 'UPDATE_MONTHLY_PCT',
                index: i,
                value: parseFloat(e.target.value) || 0,
              })}
            />
          </div>
        ))}
      </div>
      <div className={`monthly-sum ${isOk ? 'ok' : 'error'}`}>
        <span>Sum: <strong>{sum.toFixed(2)}%</strong></span>
        {!isOk && <span>⚠ Must equal 100.00</span>}
        {isOk && <span>✓ Valid</span>}
      </div>
    </div>
  );
}
