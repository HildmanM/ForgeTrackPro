import React from 'react';
interface KPICardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: string;
}
const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  trend,
  icon,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-900/40 border-blue-700',
    green: 'bg-green-900/40 border-green-700',
    amber: 'bg-amber-900/40 border-amber-700',
    red: 'bg-red-900/40 border-red-700'
  };
  return <div className={`rounded-lg border ${colorClasses[color]} p-5 shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
          {trend && <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <span>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-gray-400">vs last month</span>
            </div>}
        </div>
        {icon && <div className="p-2 rounded-full bg-gray-800/60">{icon}</div>}
      </div>
    </div>;
};
export default KPICard;