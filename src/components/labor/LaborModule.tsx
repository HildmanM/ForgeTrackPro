import React from 'react';
import {
  Users,
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  TrendingUp,
  Download,
  Search
} from 'lucide-react';

const laborRecords = [
  { id: 'L-001', employee: 'John Carter', job: 'J-101', hours: 8, date: '2025-06-28', station: 'Python Station' },
  { id: 'L-002', employee: 'Samantha Ray', job: 'J-102', hours: 6.5, date: '2025-06-28', station: 'Master Cutter' },
  { id: 'L-003', employee: 'Mike Lee', job: 'J-103', hours: 7, date: '2025-06-27', station: 'Dragon Welder' },
  { id: 'L-004', employee: 'Sarah Chen', job: 'J-101', hours: 4.5, date: '2025-06-28', station: 'Shop Floor' },
];

const LaborModule = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Labor Telemetry</h1>
          <p className="text-slate-400 mt-1">Real-time tracking of shop floor performance</p>
        </div>
        <div className="flex space-x-3">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2 border-slate-700/50">
            <Search size={18} className="text-slate-500" />
            <input className="bg-transparent border-none text-sm focus:ring-0 placeholder-slate-600 w-40" placeholder="Search employee..." />
          </div>
          <button className="premium-button !from-indigo-500 !to-blue-600 flex items-center space-x-2">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card border-indigo-500/20 bg-indigo-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Hours Today</p>
              <h3 className="text-3xl font-black text-white mt-1">26.0</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
              <Clock size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card border-sky-500/20 bg-sky-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Staff</p>
              <h3 className="text-3xl font-black text-white mt-1">14</h3>
            </div>
            <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400">
              <Users size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efficiency Index</p>
              <h3 className="text-3xl font-black text-white mt-1">92%</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden border border-slate-700/50 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-800/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Work Station</th>
                <th className="px-6 py-4 text-center">Hours</th>
                <th className="px-6 py-4">Linked Job</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {laborRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                        {rec.employee[0]}
                      </div>
                      <span className="font-bold text-white uppercase tracking-tight text-xs">{rec.employee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <MapPin size={14} className="text-slate-600" />
                      <span className="font-medium text-xs">{rec.station}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                      {rec.hours.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-sky-400 text-xs bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                      {rec.job}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right font-medium text-slate-500 text-xs">
                    <div className="flex items-center justify-end space-x-2">
                      <CalendarIcon size={12} />
                      <span>{rec.date}</span>
                    </div>
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

export default LaborModule;
