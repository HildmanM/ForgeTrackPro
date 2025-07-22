import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon, color = "blue" }) => (
  <div className={`bg-gray-800 rounded-lg border-l-4 p-4 border-${color}-400 shadow-lg`}>
    <div className="flex items-center mb-2">
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-sm font-semibold text-gray-400">{title}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    {trend && <div className="text-xs text-gray-400">{trend}</div>}
  </div>
);

export default KPICard;
