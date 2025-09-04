import React from 'react';
import { Bar } from '@ant-design/charts';

export type ChartDemoProps = {
  stats: Array<{ title: string; value: number; color: string; icon: React.ReactNode }>;
};

const BarChartDemo: React.FC<ChartDemoProps> = ({ stats }) => {
  const data = stats.map(s => ({ type: s.title, value: s.value, color: s.color }));
  const config = {
    data,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    colorField: 'color',
    color: data.map(d => d.color),
    legend: false,
    height: 300,
    barWidthRatio: 0.6,
  };
  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Bar Chart Demo</h3>
      <Bar {...config} />
    </div>
  );
};

export default BarChartDemo;
