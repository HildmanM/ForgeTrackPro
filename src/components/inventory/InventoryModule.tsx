import React from 'react';
import {
  Package,
  MapPin,
  AlertTriangle,
  Layers,
  CornerUpRight,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

const inventory = [
  { id: 'I-001', item: 'H-Beams', quantity: 3, location: 'Yard A', threshold: 5, status: 'Critical' },
  { id: 'I-002', item: 'Rebar', quantity: 8, location: 'Yard B', threshold: 10, status: 'Low' },
  { id: 'I-003', item: 'Steel Plates', quantity: 15, location: 'Shop Floor', threshold: 12, status: 'Healthy' },
];

const InventoryModule = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Stock Assets</h1>
          <p className="text-slate-400 mt-1">Inventory levels and yard logistics management</p>
        </div>
        <button className="premium-button flex items-center space-x-2">
          <Layers size={18} />
          <span>Inventory Audit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border-l-4 border-l-rose-500/50 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest">Low Stock Alerts</h4>
            <p className="text-2xl font-black text-white">2 Items</p>
          </div>
          <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400 animate-pulse">
            <AlertTriangle size={24} />
          </div>
        </div>
        <div className="glass-panel p-6 border-l-4 border-l-emerald-500/50 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Total Valuation</h4>
            <p className="text-2xl font-black text-white">$142,500</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
            <TrendingDown size={24} className="rotate-180" />
          </div>
        </div>
      </div>

      <div className="glass-panel p-8">
        <div className="flex items-center space-x-12 mb-8 border-b border-slate-800 pb-6">
          <button className="text-sky-400 font-bold border-b-2 border-sky-400 pb-6 -mb-6">Yard Matrix</button>
          <button className="text-slate-500 font-bold hover:text-slate-300 transition-colors">Warehouse</button>
          <button className="text-slate-500 font-bold hover:text-slate-300 transition-colors">Pending Inbound</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {inventory.map((inv) => (
            <div key={inv.id} className="relative group overflow-hidden rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-sky-500/30 transition-all duration-300 p-6">
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-sky-400"><CornerUpRight size={18} /></button>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 shadow-inner">
                  <Package size={28} />
                </div>
                {inv.status === 'Critical' ? (
                  <span className="px-2 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-bold rounded-lg border border-rose-500/20 uppercase tracking-tighter">
                    Critical
                  </span>
                ) : inv.status === 'Low' ? (
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold rounded-lg border border-amber-500/20 uppercase tracking-tighter">
                    Sourcing Needed
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20 uppercase tracking-tighter">
                    Optimal
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{inv.item}</h3>
                  <div className="flex items-center text-xs text-slate-500 mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>{inv.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>Quantity</span>
                    <span className={inv.quantity <= inv.threshold ? 'text-rose-400' : 'text-emerald-400'}>
                      {inv.quantity} / {inv.threshold * 2}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${inv.quantity <= inv.threshold ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'bg-emerald-500'}`}
                      style={{ width: `${(inv.quantity / (inv.threshold * 2)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full py-2 bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-all flex items-center justify-center space-x-2 group/btn">
                    <span>Manage Stock</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryModule;
