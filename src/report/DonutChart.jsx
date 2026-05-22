import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function DonutChart({ annualMwh, gridImport }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    if (!canvasRef.current) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: [
          `Solar (${Math.round(annualMwh).toLocaleString()} MWh)`,
          `Grid Import (${Math.round(gridImport).toLocaleString()} MWh)`,
        ],
        datasets: [{
          data: [annualMwh, gridImport],
          backgroundColor: ['#005FAB', '#dde8f5'],
          borderWidth: 0,
          hoverOffset: 4,
        }],
      },
      options: {
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${Math.round(ctx.parsed)} MWh` } },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [annualMwh, gridImport]);

  return <canvas ref={canvasRef} role="img" aria-label="Energy mix: solar generation vs. grid import" />;
}
