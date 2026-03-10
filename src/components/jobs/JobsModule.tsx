import React from 'react';
import {
  Briefcase,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  MoreVertical,
  ArrowUpRight,
  Plus
} from 'lucide-react';

const jobs = [
  { id: 'J-101', client: 'Alpha Steel', status: 'Completed', dueDate: '2025-06-25', priority: 'High', manager: 'M. Hildman' },
  { id: 'J-102', client: 'Beta Fabrication', status: 'In Progress', dueDate: '2025-07-02', priority: 'Medium', manager: 'J. Smith' },
  { id: 'J-103', client: 'Gamma Works', status: 'Pending', dueDate: '2025-07-10', priority: 'Low', manager: 'A. Johnson' },
  { id: 'J-104', client: 'Delta Structures', status: 'In Progress', dueDate: '2025-07-15', priority: 'High', manager: 'M. Hildman' },
];

const JobsModule = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Fabrication Jobs</h1>
          <p className="text-slate-400 mt-1">Manage and track active project lifecycles</p>
        </div>
        <button className="premium-button flex items-center space-x-2">
          <Plus size={18} />
          <span>New Job</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="glass-panel overflow-hidden border border-slate-700/50 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-800/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-4">Job Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Timeline</th>
                  <th className="px-6 py-4">Manager</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-sky-400 transition-colors">{job.id}</div>
                          <div className="text-xs text-slate-400 font-medium">{job.client}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        {job.status === 'Completed' ? (
                          <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
                            <CheckCircle2 size={12} />
                            <span>{job.status}</span>
                          </span>
                        ) : job.status === 'In Progress' ? (
                          <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full border border-amber-500/20">
                            <Clock size={12} />
                            <span>{job.status}</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-500/10 text-slate-400 text-xs font-bold rounded-full border border-slate-500/20">
                            <Clock size={12} />
                            <span>{job.status}</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <Calendar size={14} className="text-slate-500" />
                        <span className="font-medium">{job.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                          {job.manager.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-xs">{job.manager}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                          <ArrowUpRight size={18} />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
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

export default JobsModule;
