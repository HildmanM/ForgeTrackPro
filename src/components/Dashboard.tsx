import React from 'react';
import {
  CheckCircleIcon,
  ScaleIcon,
  ClockIcon,
  TrendingUpIcon,
  AlertTriangleIcon
} from 'lucide-react';

import KPICard from './KPICard';

const Dashboard = () => {
  const kpiData = [
    {
      title: 'Jobs Completed',
      value: 42,
      trend: { value: 8, isPositive: true },
      icon: <CheckCircleIcon />,
      color: 'green'
    },
    {
      title: 'Material Usage',
      value: '384.5 tons',
      trend: { value: 5, isPositive: true },
      icon: <ScaleIcon />,
      color: 'emerald'
    },
    {
      title: 'Labor Hours',
      value: '1,245 hrs',
      trend: { value: -3, isPositive: false },
      icon: <ClockIcon />,
      color: 'orange'
    },
    {
      title: 'Efficiency Rate',
      value: '92%',
      trend: { value: 4, isPositive: true },
      icon: <TrendingUpIcon />,
      color: 'blue'
    }
  ];

  const alerts = [
    { item: 'Steel I-Beam (W8x15)', quantity: 12, threshold: 20, status: 'Low Stock' },
    { item: 'Steel Plate (3/8")', quantity: 8, threshold: 15, status: 'Low Stock' },
    { item: 'Angle Iron (2"x2")', quantity: 5, threshold: 10, status: 'Critical' }
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <h2 className="text-lg font-medium mb-4">Job Status Distribution</h2>
          <div className="text-center py-12 text-gray-400">Chart placeholder</div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <h2 className="text-lg font-medium mb-4">Monthly Production</h2>
          <div className="text-center py-12 text-gray-400">Chart placeholder</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <h2 className="text-lg font-medium mb-4">Recent Jobs</h2>
          <div className="text-center py-12 text-gray-400">Table placeholder</div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            Inventory Alerts
            <AlertTriangleIcon className="text-yellow-400" size={20} />
          </h2>
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="text-left border-b border-gray-600">
                <th className="py-2">Item</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2">{alert.item}</td>
                  <td className="py-2">{alert.quantity}</td>
                  <td className="py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        alert.status === 'Critical'
                          ? 'bg-red-600 text-white'
                          : 'bg-yellow-500 text-black'
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
