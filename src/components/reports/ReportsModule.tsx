import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import {
  FileBarChart2,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  PieChart as PieIcon
} from 'lucide-react';

const reportData = [
  { week: 'Week 1', hours: 120, production: 45, efficiency: 88 },
  { week: 'Week 2', hours: 135, production: 52, efficiency: 92 },
  { week: 'Week 3', hours: 150, production: 48, efficiency: 85 },
  { week: 'Week 4', hours: 142, production: 61, efficiency: 95 },
];

const ReportsModule = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Business Intelligence</h1>
          <p className="text-slate-400 mt-1 font-medium">Advanced production analytics and performance reporting</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="glass-panel px-4 py-2 flex items-center space-x-2 border-slate-700/50 text-slate-300 hover:text-white transition-colors">
            <Calendar size={18} />
            <span className="text-sm font-bold">Last 30 Days</span>
          </button>
          <button className="premium-button flex items-center space-x-2 shadow-lg shadow-sky-500/20">
            <Download size={18} />
            <span>Generate PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Labor Chart */}
        <div className="glass-panel p-8 space-y-6 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-sky-400"><ArrowUpRight size={20} /></button>
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <FileBarChart2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white font-sans uppercase tracking-tight">Labor Output Velocity</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="hours" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-emerald-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth Trend</span>
            </div>
            <span className="text-emerald-400 font-black text-sm">+12.4% MoM</span>
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="glass-panel p-8 space-y-6 border border-slate-700/50 shadow-2xl overflow-hidden group">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white font-sans uppercase tracking-tight">Efficiency Coefficient</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reportData}>
                <defs>
                  <linearGradient id="effGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} fill="url(#effGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1 p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Peak Value</p>
              <p className="text-lg font-black text-white">95%</p>
            </div>
            <div className="flex-1 p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Avg Value</p>
              <p className="text-lg font-black text-white">91%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 border border-slate-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
              <PieIcon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Production vs Labor Baseline</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-bold text-sky-400 border border-sky-500/20 shadow-lg shadow-sky-500/5">WEEKLY</button>
            <button className="px-3 py-1 bg-transparent hover:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 transition-colors">MONTHLY</button>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: '#94a3b8' }} />
              <Line type="monotone" dataKey="production" stroke="#38bdf8" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, fill: '#0f172a' }} />
              <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;
