import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, ChartDataLabels);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function barColor(value, max) {
  const ratio = value / max;
  if (ratio >= 0.90) return '#FFCE02';
  if (ratio >= 0.70) return '#FBA31B';
  if (ratio >= 0.55) return '#005FAB';
  if (ratio >= 0.35) return '#0B468D';
  return '#112877';
}

export default function MonthlyProductionChart({ monthlyMwh }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const total = monthlyMwh.reduce((s, v) => s + v, 0);
    const max   = Math.max(...monthlyMwh);
    const colors = monthlyMwh.map(v => barColor(v, max));

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [{
          data: monthlyMwh.map(v => Math.round(v)),
          backgroundColor: colors,
          borderRadius: 4,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.parsed.y.toLocaleString()} MWh (${Math.round(ctx.parsed.y / total * 100)}%)`,
            },
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            offset: 0,
            font: { size: 10, weight: '600' },
            color: '#374151',
            textAlign: 'center',
            formatter: (value) => `${Math.round(value / total * 100)}%`,
          },
        },
        layout: { padding: { top: 20 } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 }, color: '#6b7280' },
          },
          y: {
            grid: { color: '#e5e7eb' },
            ticks: {
              font: { size: 11 },
              color: '#6b7280',
              callback: v => `${v} MWh`,
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [monthlyMwh]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '200px' }} />;
}
