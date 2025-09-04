import React from 'react';
import { Pie } from '@ant-design/plots';
interface Stat {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
}

interface PieChartDemoProps {
  stats: Stat[];
}

export default function PieChartDemo({ stats }: PieChartDemoProps) {
  const config = {
    data: stats.map(stat => ({ type: stat.title, value: stat.value })),
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    width: 350,
    height: 250,
  };
  return (
    <div style={{ width: '100%', maxWidth: 350, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Pie {...config} />
    </div>
  );
}
