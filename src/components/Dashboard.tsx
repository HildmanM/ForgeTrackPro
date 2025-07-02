import React from 'react';
import {
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon
} from 'lucide-react';
import KPICard from './KPICard';

const Dashboard = () => {
  const data = JSON.parse(localStorage.getItem('teklaData') || '[]');
  const totalHours = data.reduce((sum: number, item: any) => sum + item.hours, 0);
  const totalJobs = new Set(data.map((item: any) => item.job)).size;

  const kpiData = [
    {
      title: 'Jobs Completed',
      value: totalJobs,
      trend: { value: 5, isPositive: true },
      icon: <CheckCircleIcon />,
      color: 'green'
    },
    {
      title: 'Labor Hours',
      value: totalHours.toFixed(2),
      trend: { value: 12, isPositive: true },
      icon: <ClockIcon />,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ForgeTrack Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            icon={kpi.icon}
            color={kpi.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

