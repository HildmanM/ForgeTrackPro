import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "amber";
}

const colorMap = {
  blue: "text-blue-400 bg-blue-900/30",
  green: "text-green-400 bg-green-900/30",
  amber: "text-amber-400 bg-amber-900/30",
};

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon, color }) => {
  return (
    <div className={`rounded-lg border border-gray-700 p-5 shadow-md bg-gray-800`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-400">{title}</div>
        <div className={`p-2 rounded-full ${colorMap[color]}`}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400 mt-1">{trend}</div>
    </div>
  );
};

export default KPICard;

