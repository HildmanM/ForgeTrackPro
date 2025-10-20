import React from "react";
import { CheckCircle, Scale, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import KPICard from "@/components/common/KPICard";
import {
  kpiData,
  recentJobs,
  inventoryAlerts,
  monthlyProductionData,
  jobStatusDistribution,
} from "@/data/mockData";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold text-white">ForgeTrack Dashboard</h1>
        <div className="text-xs text-zinc-400">Last updated: just now</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Jobs Completed"
          value={kpiData.jobsCompleted.value}
          trend={{ value: 3, direction: "up" }}
          icon={<CheckCircle className="h-5 w-5" />}
          color="green"
        />
        <KPICard
          title="Material Usage"
          value={kpiData.materialUsage.value}
          trend={{ value: 5, direction: "up" }}
          icon={<Scale className="h-5 w-5" />}
          color="blue"
        />
        <KPICard
          title="Labor Hours"
          value={kpiData.laborHours.value}
          trend={{ value: 2, direction: "down" }}
          icon={<Clock className="h-5 w-5" />}
          color="amber"
        />
        <KPICard
          title="Efficiency Rate"
          value={kpiData.efficiencyRate.value}
          trend={{ value: 1, direction: "up" }}
          icon={<TrendingUp className="h-5 w-5" />}
          color="red"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-3 text-sm text-zinc-300">Monthly Production (hrs)</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProductionData}>
                <XAxis dataKey="month" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip />
                <Bar dataKey="production" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-3 text-sm text-zinc-300">Job Status Distribution</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={jobStatusDistribution} dataKey="value" nameKey="name" outerRadius={80} label>
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
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-300">
            <Briefcase className="h-4 w-4" />
            Recent Jobs
          </div>
          <ul className="space-y-2 text-sm text-zinc-200">
            {recentJobs.map((j) => (
              <li key={j.id} className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-2">
                <span className="font-medium">{j.id}</span>
                <span className="text-zinc-400">{j.client}</span>
                <span className="text-zinc-300">{j.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-300">
            <AlertTriangle className="h-4 w-4" />
            Low Stock Alerts
          </div>
          <ul className="space-y-2 text-sm text-zinc-200">
            {inventoryAlerts.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-2">
                <span className="font-medium">{a.item}</span>
                <span className="text-zinc-300">Qty: {a.quantity}</span>
                <span className="text-zinc-400">{a.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function Briefcase(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"/><path d="M14 7V5a2 2 0 00-2-2v0a2 2 0 00-2 2v2"/></svg>;
}







