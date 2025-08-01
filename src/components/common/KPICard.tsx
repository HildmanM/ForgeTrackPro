import React from 'react';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'amber';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon, color }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full bg-${color}-900/20 text-${color}-400`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-gray-400">{title}</h3>
          <p className="text-lg font-semibold text-white">{value}</p>
          <p className="text-xs text-gray-500">{trend}</p>
        </div>
      </div>
    </div>
  );
};

export default KPICard;


