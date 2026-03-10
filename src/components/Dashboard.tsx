import React from 'react';
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  Package,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import KPICard from './KPICard';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { monthlyProductionData, jobStatusDistribution } from '../data/mockData';

const Dashboard = () => {
  const data = JSON.parse(localStorage.getItem('teklaData') || '[]');
  const totalHours = data.reduce((sum: number, item: any) => sum + item.hours, 0);
  const totalJobs = new Set(data.map((item: any) => item.job)).size;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
            Operations Overview
          </h1>
          <p className="text-slate-400 mt-1 font-medium">Real-time fabrication & production insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="premium-button flex items-center space-x-2">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-700/50 mx-2" />
          <span className="text-slate-400 text-sm font-medium bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
            Last Updated: Today, 11:34 AM
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Fabrication Jobs"
          value={totalJobs || 12}
          trend={{ value: 12, isPositive: true }}
          icon={<Package />}
          color="sky"
        />
        <KPICard
          title="Active Labor Hours"
          value={totalHours > 0 ? totalHours.toFixed(1) : "1,248"}
          trend={{ value: 5.4, isPositive: true }}
          icon={<Clock />}
          color="indigo"
        />
        <KPICard
          title="Production Efficiency"
          value="94.2%"
          trend={{ value: 2.1, isPositive: true }}
          icon={<TrendingUp />}
          color="emerald"
        />
        <KPICard
          title="Quality Pass Rate"
          value="99.8%"
          trend={{ value: 0.4, isPositive: true }}
          icon={<CheckCircle2 />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Production Analytics</h3>
            <button className="text-sky-400 text-sm font-semibold hover:text-sky-300 transition-colors flex items-center space-x-1">
              <span>View Details</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProductionData}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}t`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area
                  type="monotone"
                  dataKey="production"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorProd)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-xl font-bold text-white">Job Status Distribution</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobStatusDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {jobStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0ea5e9' : index === 1 ? '#6366f1' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
