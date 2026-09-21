import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CHART_INK, CHART_GRID, SERIES_ROOFTOP } from './chartTheme';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, ChartDataLabels);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Monthly generation, one bar per month.
 *
 * One series, so one colour. The chart previously ramped each bar across five
 * hues by its share of the maximum, which encoded bar height a second time in
 * colour and put two bars reading the same percentage in different colours —
 * March and August both printed 9%, one yellow and one orange. Height carries
 * magnitude; colour carries nothing here, so it stays constant.
 *
 * Only the peak month is labelled. A value above all twelve bars is noise on
 * paper, and the axis already carries the rest.
 */
export default function MonthlyProductionChart({ monthlyMwh }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const values = monthlyMwh.map(v => Math.round(v));
    const total  = values.reduce((s, v) => s + v, 0);
    // The first month at the maximum, not every month matching it: on a small
    // site the rounded values tie (100 Hamilton peaks at 6 MWh in four months)
    // and testing the value would label all of them.
    const peakIndex = values.indexOf(Math.max(...values));

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [{
          data: values,
          backgroundColor: SERIES_ROOFTOP,
          borderRadius: 4,
          borderSkipped: false,
          categoryPercentage: 0.82, // ~2px of surface between adjacent bars
          barPercentage: 0.9,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // one series — the section title names it
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.parsed.y.toLocaleString()} MWh (${total ? Math.round(ctx.parsed.y / total * 100) : 0}%)`,
            },
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            offset: 0,
            font: { size: 10, weight: '600' },
            color: CHART_INK,
            // the extreme only
            display: ctx => ctx.dataIndex === peakIndex,
            formatter: v => `${v.toLocaleString()} MWh`,
          },
        },
        layout: { padding: { top: 20 } },
        scales: {
          x: {
            grid: { display: false },
            border: { color: CHART_GRID },
            ticks: { font: { size: 11 }, color: CHART_INK },
          },
          y: {
            grid: { color: CHART_GRID, drawTicks: false },
            border: { display: false },
            // unit named once on the axis, not repeated on every tick
            title: { display: true, text: 'MWh', font: { size: 10 }, color: CHART_INK },
            ticks: {
              font: { size: 11 },
              color: CHART_INK,
              maxTicksLimit: 5,
              callback: v => Math.round(v).toLocaleString(),
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
