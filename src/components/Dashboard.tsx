import React from 'react';
import { CheckCircleIcon, ScaleIcon, ClockIcon, TrendingUpIcon, AlertTriangleIcon } from 'lucide-react';
import KPICard from './common/KPICard';
import { useDashboardData } from './common/DashboardDataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const { dashboardData } = useDashboardData();
  const { kpiData, recentJobs, inventoryAlerts, monthlyProductionData, jobStatusDistribution } = dashboardData;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ForgeTrack Dashboard</h1>
        <div className="text-gray-400">Last updated: Today, 3:45 PM</div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Jobs Completed" value={kpiData.jobsCompleted.value} trend={kpiData.jobsCompleted.trend} icon={<CheckCircleIcon size={24} className="text-blue-400" />} color="blue" />
        <KPICard title="Material Usage" value={kpiData.materialUsage.value} trend={kpiData.materialUsage.trend} icon={<ScaleIcon size={24} className="text-green-400" />} color="green" />
        <KPICard title="Labor Hours" value={kpiData.laborHours.value} trend={kpiData.laborHours.trend} icon={<ClockIcon size={24} className="text-amber-400" />} color="amber" />
        <KPICard title="Efficiency Rate" value={kpiData.efficiencyRate.value} trend={kpiData.efficiencyRate.trend} icon={<TrendingUpIcon size={24} className="text-blue-400" />} color="blue" />
      </div>
      {/* Charts and tables as before, using dashboardData fields */}
      {/* ...rest of your Dashboard.tsx code unchanged... */}
    </div>
  );
};

export default Dashboard;


