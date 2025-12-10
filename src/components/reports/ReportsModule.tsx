import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { FileText, Download } from "lucide-react";

const reportData = [
  { week: 'W1', hours: 40, efficiency: 85 },
  { week: 'W2', hours: 35, efficiency: 88 },
  { week: 'W3', hours: 50, efficiency: 92 },
  { week: 'W4', hours: 45, efficiency: 87 },
];

const ReportsModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="text-emerald-500" />
            Production Reports
          </h1>
          <p className="text-gray-400 text-sm mt-1">Detailed analysis of labor and efficiency</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Download size={16} /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Labor Hours Per Week</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="week" stroke="#9CA3AF" axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} dx={-10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#E5E7EB', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Legend />
                <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6' }} name="Labor Hours" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Efficiency Rating</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="week" stroke="#9CA3AF" axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} dx={-10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#E5E7EB', borderRadius: '0.5rem' }}
                  cursor={{ fill: '#374151', opacity: 0.2 }}
                />
                <Legend />
                <Bar dataKey="efficiency" fill="#10B981" radius={[4, 4, 0, 0]} name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;

