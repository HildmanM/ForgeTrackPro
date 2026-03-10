import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'sky' | 'indigo' | 'emerald' | 'rose' | 'amber';
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  trend,
  icon,
  color = 'sky'
}) => {
  const colorSchemes = {
    sky: 'from-sky-500/20 to-sky-500/5 border-sky-500/30 text-sky-400',
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400',
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
    rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-400',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400',
  };

  return (
    <div className={`stat-card bg-gradient-to-br ${colorSchemes[color]} border shadow-xl`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
            {title}
          </p>
          <div className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            {value}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1.5 text-sm font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span className={`px-1.5 py-0.5 rounded-md ${trend.isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner ${colorSchemes[color].split(' ')[2]}`}>
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
      </div>
    </div>
  );
};

export default KPICard;