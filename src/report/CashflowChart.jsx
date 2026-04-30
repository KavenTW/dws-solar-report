import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const STYLES = [
  { color: '#005FAB', bg: 'rgba(0,95,171,0.07)',   fill: false, width: 2.0 },
  { color: '#16a34a', bg: 'rgba(22,163,74,0.04)',  fill: true,  width: 2.0 },
  { color: '#FBA31B', bg: 'rgba(251,163,27,0.04)', fill: false, width: 2.0 },
];

export default function CashflowChart({ scenarios, labels, ppaTerm }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    if (!canvasRef.current) return;

    const datasets = scenarios.map((s, i) => ({
      label: `${Math.round(s.rate * 100)}% Ann. Utility Escalation`,
      data: s.cumSavings,
      borderColor: STYLES[i].color,
      backgroundColor: STYLES[i].bg,
      fill: STYLES[i].fill,
      tension: 0.35,
      borderWidth: STYLES[i].width,
      pointRadius: s.cumSavings.map((_, j) => j === ppaTerm - 1 ? 4 : 1),
      pointBackgroundColor: STYLES[i].color,
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

  return <canvas id="cashflowChart" height="80" ref={canvasRef} />;
}
