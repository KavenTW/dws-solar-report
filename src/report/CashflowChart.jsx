import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { CHART_COLORS } from '../constants/theme';

export default function CashflowChart({ scenarios, labels, ppaTerm }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    if (!canvasRef.current) return;

    const datasets = scenarios.map((s, i) => ({
      label: `${Math.round(s.rate * 100)}% Ann. Utility Escalation`,
      data: s.cumSavings,
      borderColor: CHART_COLORS[i].line,
      backgroundColor: CHART_COLORS[i].fill,
      fill: CHART_COLORS[i].filled,
      tension: 0.35,
      borderWidth: 2,
      pointRadius: s.cumSavings.map((_, j) => j === ppaTerm - 1 ? 4 : 1),
      pointBackgroundColor: CHART_COLORS[i].line,
    }));

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#6b7280', font: { size: 12 } } },
          tooltip: {
            callbacks: {
              label: ctx => {
                const v = ctx.parsed.y;
                return v >= 1e6 ? ` $${(v / 1e6).toFixed(2)}M USD` : ` $${Math.round(v / 1000)}K USD`;
              },
            },
          },
        },
        scales: {
          y: {
            title: { display: true, text: 'USD', color: '#6b7280', font: { size: 12 } },
            grid: { color: '#e2e8f0' },
            ticks: {
              color: '#6b7280',
              callback: v => v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${v}`,
            },
          },
          x: { grid: { display: false }, ticks: { color: '#6b7280', maxTicksLimit: 15 } },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [scenarios, labels, ppaTerm]);

  return <canvas id="cashflowChart" height="80" ref={canvasRef} aria-label="Cumulative savings over PPA term" role="img" />;
}
