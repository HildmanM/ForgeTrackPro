import React from 'react';

type Trend = {
  value: number;          // e.g., +5, -3
  direction: 'up' | 'down' | 'flat';
};

type KPICardProps = {
  title: string;
  value: string | number;
  trend?: Trend;
  icon?: React.ReactNode;
  /** Tailwind color keyword used for subtle accents */
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'gray';
};

const colorToRing: Record<NonNullable<KPICardProps['color']>, string> = {
  blue: 'ring-blue-500/30',
  green: 'ring-green-500/30',
  amber: 'ring-amber-500/30',
  red: 'ring-red-500/30',
  purple: 'ring-purple-500/30',
  gray: 'ring-gray-500/30',
};

const colorToBadge: Record<NonNullable<KPICardProps['color']>, string> = {
  blue: 'bg-blue-900/40 text-blue-300',
  green: 'bg-green-900/40 text-green-300',
  amber: 'bg-amber-900/40 text-amber-300',
  red: 'bg-red-900/40 text-red-300',
  purple: 'bg-purple-900/40 text-purple-300',
  gray: 'bg-gray-700 text-gray-300',
};

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  trend,
  icon,
  color = 'gray',
}) => {
  const ring = colorToRing[color];
  const badge = colorToBadge[color];

  const trendText =
    trend?.direction === 'up'
      ? `+${trend.value}%`
      : trend?.direction === 'down'
      ? `-${trend.value}%`
      : trend?.value != null
      ? `${trend.value}%`
      : null;

  const trendColor =
    trend?.direction === 'up'
      ? 'text-green-400'
      : trend?.direction === 'down'
      ? 'text-red-400'
      : 'text-gray-300';

  const arrow =
    trend?.direction === 'up'
      ? '▲'
      : trend?.direction === 'down'
      ? '▼'
      : '■';

  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg ring-1 ${ring}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-400">{title}</div>
        {icon ? <div className="opacity-80">{icon}</div> : null}
      </div>

      <div className="flex items-end justify-between">
        <div className="text-3xl font-semibold">{value}</div>
        {trendText && (
          <span className={`text-xs px-2 py-1 rounded-full ${badge} ${trendColor}`}>
            {arrow} {trendText}
          </span>
        )}
      </div>
    </div>
  );
};

export default KPICard;



