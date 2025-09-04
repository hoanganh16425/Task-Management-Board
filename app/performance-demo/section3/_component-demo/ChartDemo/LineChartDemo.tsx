import React from 'react';
import { Line } from '@ant-design/charts';

export type ChartDemoProps = {
  stats: Array<{ title: string; value: number; color: string; icon: React.ReactNode }>;
};

const LineChartDemo: React.FC<ChartDemoProps> = ({ stats }) => {
  const data = stats.map((s, i) => ({ date: `2025-09-0${i+1}`, value: s.value, type: s.title, color: s.color }));
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: data.map(d => d.color),
    height: 300,
    point: { size: 4, shape: 'circle' },
    legend: { position: 'top' },
  };
  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Line Chart Demo</h3>
      <Line {...config} />
    </div>
  );
};

export default LineChartDemo;
