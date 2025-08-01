import React from 'react';
import { CheckCircleIcon, ScaleIcon, ClockIcon, TrendingUpIcon, AlertTriangleIcon } from 'lucide-react';
import KPICard from '../common/KPICard';
import FileUploader from './FileUploader';
import { kpiData, recentJobs, inventoryAlerts, monthlyProductionData, jobStatusDistribution } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <FileUploader />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ForgeTrack Dashboard</h1>
        <div className="text-gray-400">Last updated: Today, 3:45 PM</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Jobs Completed" value={kpiData.jobsCompleted.value} trend={kpiData.jobsCompleted.trend} icon={<CheckCircleIcon size={24} className="text-blue-400" />} color="blue" />
        <KPICard title="Material Usage" value={kpiData.materialUsage.value} trend={kpiData.materialUsage.trend} icon={<ScaleIcon size={24} className="text-green-400" />} color="green" />
        <KPICard title="Labor Hours" value={kpiData.laborHours.value} trend={kpiData.laborHours.trend} icon={<ClockIcon size={24} className="text-amber-400" />} color="amber" />
        <KPICard title="Efficiency Rate" value={kpiData.efficiencyRate.value} trend={kpiData.efficiencyRate.trend} icon={<TrendingUpIcon size={24} className="text-blue-400" />} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <h2 className="text-lg font-medium mb-4">Monthly Production</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProductionData}>
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} itemStyle={{ color: '#E5E7EB' }} />
                <Bar dataKey="production" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <h2 className="text-lg font-medium mb-4">Job Status Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={jobStatusDistribution} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                  {jobStatusDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} itemStyle={{ color: '#E5E7EB' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <h2 className="text-lg font-medium mb-4">Recent Jobs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Job ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Completion</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentJobs.map(job => (
                  <tr key={job.id} className="hover:bg-gray-700">
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{job.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{job.client}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${job.status === 'Completed' ? 'bg-green-900/40 text-green-400' : job.status === 'In Progress' ? 'bg-blue-900/40 text-blue-400' : 'bg-amber-900/40 text-amber-400'}`}>{job.status}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${job.completion}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">{job.completion}%</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{job.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Inventory Alerts</h2>
            <AlertTriangleIcon size={20} className="text-amber-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Threshold</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {inventoryAlerts.map(item => (
                  <tr key={item.id} className="hover:bg-gray-700">
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.item}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.quantity}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.threshold}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





