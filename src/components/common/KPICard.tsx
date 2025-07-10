// src/components/common/KPICard.tsx
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  trend: number;            // e.g. +5 or -2
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'amber' | 'red';
}

const COLORS = {
  blue: 'bg-blue-900/40 text-blue-400',
  green: 'bg-green-900/40 text-green-400',
  amber: 'bg-amber-900/40 text-amber-400',
  red: 'bg-red-900/40 text-red-400',
};

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon, color = 'blue' }) => {
  const trendClass = trend >= 0 ? 'text-green-400' : 'text-red-400';
  const TrendIcon = trend >= 0 ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg flex items-center space-x-4`}>
      <div className={`p-3 rounded-full ${COLORS[color]}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-400">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className="flex items-center space-x-1">
        <TrendIcon size={16} className={trendClass} />
        <span className={`${trendClass} text-sm`}>{Math.abs(trend)}%</span>
      </div>
    </div>
  );
};

export default KPICard;
