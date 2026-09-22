import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { CHART_INK, CHART_GRID, SERIES_ROOFTOP, SERIES_CARPORT } from '../chartTheme';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * Horizontal stacked bar (kW DC): rooftop vs carport, by prioritization group.
 * Horizontal because three categories leave a column chart mostly empty and the
 * group names read straight without rotation.
 * Data comes from the included projects so the chart always agrees with the KPI
 * strip. The legend is HTML (see PortfolioExecSummary) because a canvas legend
 * is part of the bitmap and gets clipped when print scales the canvas.
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
          // 2px of surface between the stacked segments, rather than a border
          { label: 'Rooftop', data: states.map(s => Math.round(s.rooftopDC)), backgroundColor: SERIES_ROOFTOP, borderRadius: 4, borderSkipped: false, barThickness: 22, borderColor: '#ffffff', borderWidth: { right: 2 } },
          { label: 'Carport', data: states.map(s => Math.round(s.carportDC)), backgroundColor: SERIES_CARPORT, borderRadius: 4, borderSkipped: false, barThickness: 22 },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // rendered as HTML alongside the chart
          tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.x.toLocaleString()} kW DC` } },
          datalabels: { display: false },
        },
        scales: {
          x: {
            stacked: true,
            grid: { color: CHART_GRID, drawTicks: false },
            border: { display: false },
            title: { display: true, text: 'kW DC', font: { size: 11 }, color: CHART_INK },
            ticks: { font: { size: 11 }, color: CHART_INK, maxTicksLimit: 6, callback: v => v.toLocaleString() },
            beginAtZero: true,
          },
          y: { stacked: true, grid: { display: false }, border: { color: CHART_GRID }, ticks: { font: { size: 11 }, color: CHART_INK } },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [states]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}
