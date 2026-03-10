import React from 'react';
import {
  Users,
  Building2,
  Phone,
  Mail,
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const clients = [
  { id: 'C-001', name: 'Alpha Steel', contact: 'John Doe', phone: '555-1234', email: 'j.doe@alphasteel.com', status: 'Active' },
  { id: 'C-002', name: 'Beta Fabrication', contact: 'Jane Smith', phone: '555-5678', email: 'jane@betafab.com', status: 'Active' },
  { id: 'C-003', name: 'Gamma Works', contact: 'Alan Johnson', phone: '555-9012', email: 'alan.j@gamma.io', status: 'Inactive' },
];

const ClientsModule = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Partner Network</h1>
          <p className="text-slate-400 mt-1">Manage client relationships and project stakeholders</p>
        </div>
        <button className="premium-button flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Client</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="stat-card group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button className="text-slate-500 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500/20 to-sky-500/5 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20 shadow-lg">
                <Building2 size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight">
                  {client.name}
                </h3>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-500'}`} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{client.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <Users size={14} />
                  </div>
                  <div className="text-xs">
                    <p className="text-slate-500 font-medium">Main Contact</p>
                    <p className="text-white font-bold">{client.contact}</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-slate-600 group-hover:text-sky-400 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50 flex flex-col items-center justify-center space-y-1 hover:bg-slate-800/50 transition-colors cursor-pointer group/btn">
                  <Phone size={14} className="text-slate-500 group-hover/btn:text-sky-400 transition-colors" />
                  <span className="text-[10px] font-bold text-slate-400">CALL</span>
                </div>
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50 flex flex-col items-center justify-center space-y-1 hover:bg-slate-800/50 transition-colors cursor-pointer group/btn">
                  <Mail size={14} className="text-slate-500 group-hover/btn:text-sky-400 transition-colors" />
                  <span className="text-[10px] font-bold text-slate-400">EMAIL</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] font-bold text-slate-500">
                <div className="flex items-center space-x-1 uppercase">
                  <ShieldCheck size={12} className="text-emerald-500/70" />
                  <span>Verified Partner</span>
                </div>
                <span>ID: {client.id}</span>
              </div>
            </div>
          </div>
        ))}

        <button className="glass-panel p-6 border-dashed border-2 border-slate-700/50 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 group/add">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover/add:bg-sky-500 group-hover/add:text-white transition-all shadow-xl">
            <Plus size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-tight">Register New</h4>
            <p className="text-xs text-slate-500 font-medium">Add a stakeholder to the ForgeTrack ecosystem</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ClientsModule;
