import React from 'react';
import {
  CheckCircleIcon,
  ScaleIcon,
  ClockIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
} from 'lucide-react';

import KPICard from '@/components/common/KPICard';
import {
  kpiData,
  recentJobs,
  inventoryAlerts,
  monthlyProductionData,
  jobStatusDistribution,
} from '@/data/mockData';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const Dashboard: React.FC = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ForgeTrack Dashboard</h1>
        <div className="text-gray-400">Last updated: Today, 3:45 PM</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Jobs Completed"
          value={kpiData.jobsCompleted.value}
          trend={kpiData.jobsCompleted.trend}
          icon={<CheckCircleIcon size={22} />}
          color="green"
        />
        <KPICard
          title="On-Time Delivery"
          value={`${kpiData.onTimeDelivery.value}%`}
          trend={kpiData.onTimeDelivery.trend}
          icon={<ClockIcon size={22} />}
          color="blue"
        />
        <KPICard
          title="Avg. Hours/Job"
          value={kpiData.avgHoursPerJob.value}
          trend={kpiData.avgHoursPerJob.trend}
          icon={<ScaleIcon size={22} />}
          color="amber"
        />
        <KPICard
          title="Issues/Alerts"
          value={kpiData.issues.value}
          trend={kpiData.issues.trend}
          icon={<AlertTriangleIcon size={22} />}
          color="red"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-300 font-semibold">Monthly Production (hrs)</div>
            <TrendingUpIcon size={18} className="opacity-70" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProductionData}>
                <XAxis dataKey="month" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Bar dataKey="hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="text-sm text-gray-300 font-semibold mb-2">Job Status Distribution</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={jobStatusDistribution} dataKey="value" nameKey="name" outerRadius={90}>
                  {jobStatusDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Jobs & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="text-sm text-gray-300 font-semibold mb-3">Recent Jobs</div>
          <ul className="space-y-2">
            {recentJobs.map((j) => (
              <li key={j.id} className="flex justify-between text-sm text-gray-300">
                <span className="font-medium">{j.name}</span>
                <span className="text-gray-400">{j.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="text-sm text-gray-300 font-semibold mb-3">Low Stock Alerts</div>
          <ul className="space-y-2">
            {inventoryAlerts.map((a) => (
              <li key={a.id} className="flex justify-between text-sm text-gray-300">
                <span className="font-medium">{a.item}</span>
                <span className="text-gray-400">Qty: {a.qty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;







