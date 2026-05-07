import React, { useEffect, useState } from "react";
import { fetchKpis } from "../services/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  Activity
} from "lucide-react";

// --- Mock Data for Trends ---
const trendData = [
  { name: "Mon", jobs: 4, completed: 2 },
  { name: "Tue", jobs: 6, completed: 3 },
  { name: "Wed", jobs: 8, completed: 5 },
  { name: "Thu", jobs: 5, completed: 4 },
  { name: "Fri", jobs: 9, completed: 7 },
  { name: "Sat", jobs: 4, completed: 3 },
  { name: "Sun", jobs: 3, completed: 2 },
];

const statusData = [
  { name: "Active", value: 12 },
  { name: "Completed", value: 8 },
  { name: "On Hold", value: 3 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

// --- Components ---

const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  color,
}: {
  label: string;
  value: string | number;
  icon: any;
  trend: string;
  color: string;
}) => (
  <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg relative overflow-hidden group hover:border-gray-600 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={64} />
    </div>
    <div className="flex flex-col relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-gray-700/50 ${color.replace("text-", "text-opacity-100 ")}`}>
          <Icon size={20} className={color} />
        </div>
        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded-full">
          <ArrowUpRight size={12} /> {trend}
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400 font-medium tracking-wide">
        {label}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<any | null>(null);

  useEffect(() => {
    fetchKpis().then(setKpis).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="text-blue-500" />
            Executive Overview
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time insights across production and inventory
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
            Last updated: Just now
          </span>
          <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Jobs"
          value={kpis?.totalJobs ?? "-"}
          icon={Briefcase}
          trend="+12%"
          color="text-blue-500"
        />
        <StatCard
          label="Jobs Completed"
          value={kpis?.jobsCompleted ?? "-"}
          icon={CheckCircle}
          trend="+5%"
          color="text-emerald-500"
        />
        <StatCard
          label="Active Clients"
          value={kpis?.totalClients ?? "-"}
          icon={Users}
          trend="+2"
          color="text-purple-500"
        />
        <StatCard
          label="Labor Hours"
          value={kpis?.totalLaborHours ?? "-"}
          icon={Clock}
          trend="+8.5%"
          color="text-amber-500"
        />
      </div>

      {/* Main Charts Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Production Trends</h3>
            <select className="bg-gray-900 border border-gray-700 text-xs text-gray-300 rounded-md px-2 py-1 outline-none focus:border-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#9CA3AF"
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F3F4F6",
                    borderRadius: "0.5rem",
                  }}
                  itemStyle={{ color: "#E5E7EB" }}
                />
                <Area
                  type="monotone"
                  dataKey="jobs"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorJobs)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Job Status Distribution</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F3F4F6",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-white">23</span>
              <span className="text-xs text-gray-500">Active Jobs</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {statusData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

