import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * Stacked capacity-by-state bar (kW DC): rooftop vs carport. Data comes from
 * the included projects so the chart always agrees with the KPI strip.
 */
export default function PortfolioCapacityChart({ states }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: states.map(s => s.name),
        datasets: [
          { label: 'Rooftop', data: states.map(s => Math.round(s.rooftopDC)), backgroundColor: '#005FAB', borderRadius: 3, borderSkipped: false },
          { label: 'Carport', data: states.map(s => Math.round(s.carportDC)), backgroundColor: '#FBA31B', borderRadius: 3, borderSkipped: false },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} kW DC` } },
          datalabels: { display: false },
        },
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 }, color: '#6b7280' } },
          y: { stacked: true, grid: { color: '#e5e7eb' }, ticks: { font: { size: 10 }, color: '#6b7280', callback: v => `${v.toLocaleString()} kW` }, beginAtZero: true },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [states]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}
