import { useProject } from '../context/ProjectContext';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function pctSum(pct) {
  return pct.reduce((a, b) => a + (parseFloat(b) || 0), 0);
}

export default function MonthlyPctGrid() {
  const { state, dispatch } = useProject();
  const { monthlyDistributions, activeDistributionIndex } = state.project;

  if (!monthlyDistributions?.length) return null;

  return (
    <div className="dist-table-wrap">
      <table className="dist-table">
        <thead>
          <tr>
            <th className="dist-month-col" />
            {monthlyDistributions.map((d, di) => {
              const active = di === activeDistributionIndex;
              return (
                <th
                  key={di}
                  className={`dist-col-header${active ? ' dist-col-active' : ''}`}
                  onClick={() => dispatch({ type: 'SELECT_DISTRIBUTION', index: di })}
                  title={active ? 'Active — used in report' : 'Click to use this distribution'}
                >
                  <input
                    className="dist-label-input"
                    value={d.label}
                    maxLength={6}
                    onChange={e => dispatch({ type: 'UPDATE_DISTRIBUTION_LABEL', index: di, label: e.target.value })}
                    onClick={e => e.stopPropagation()}
                  />
                  {active && <span className="dist-active-badge">▶ Active</span>}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {MONTHS.map((m, mi) => (
            <tr key={m}>
              <td className="dist-month-name">{m}</td>
              {monthlyDistributions.map((d, di) => {
                const active = di === activeDistributionIndex;
                return (
                  <td key={di} className={active ? 'dist-cell-active' : ''}>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      className="dist-cell-input"
                      value={d.pct[mi]}
                      onChange={e => dispatch({
                        type: 'UPDATE_DISTRIBUTION_PCT',
                        distIndex: di,
                        monthIndex: mi,
                        value: parseFloat(e.target.value) || 0,
                      })}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="dist-sum-label">Sum</td>
            {monthlyDistributions.map((d, di) => {
              const sum = pctSum(d.pct);
              const ok = Math.abs(sum - 100) <= 0.2;
              const active = di === activeDistributionIndex;
              return (
                <td
                  key={di}
                  className={`dist-sum ${ok ? 'dist-sum-ok' : 'dist-sum-err'}${active ? ' dist-cell-active' : ''}`}
                >
                  {sum.toFixed(2)}%{!ok && ' ⚠'}
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
