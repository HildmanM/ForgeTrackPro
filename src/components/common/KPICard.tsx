import React from "react";

type Trend = {
  value: number;                 // e.g., 5 means 5%
  direction: "up" | "down" | "flat";
};

type KPICardProps = {
  title: string;
  value: string | number;
  trend?: Trend;
  icon?: React.ReactNode;
  /** Tailwind color keyword used for subtle accents */
  color?: "blue" | "green" | "amber" | "red" | "purple" | "gray";
};

const colorToRing: Record<NonNullable<KPICardProps["color"]>, string> = {
  blue: "ring-blue-500/30",
  green: "ring-green-500/30",
  amber: "ring-amber-500/30",
  red: "ring-red-500/30",
  purple: "ring-purple-500/30",
  gray: "ring-gray-500/30",
};

const colorToBadge: Record<NonNullable<KPICardProps["color"]>, string> = {
  blue: "bg-blue-900/40 text-blue-300",
  green: "bg-green-900/40 text-green-300",
  amber: "bg-amber-900/40 text-amber-300",
  red: "bg-red-900/40 text-red-300",
  purple: "bg-purple-900/40 text-purple-300",
  gray: "bg-gray-700 text-gray-300",
};

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  trend,
  icon,
  color = "gray",
}) => {
  const ring = colorToRing[color];
  const badge = colorToBadge[color];

  const trendText =
    trend?.direction === "up"
      ? `+${trend.value}%`
      : trend?.direction === "down"
      ? `-${trend.value}%`
      : trend?.value != null
      ? `${trend.value}%`
      : null;

  const trendColor =
    trend?.direction === "up"
      ? "text-green-400"
      : trend?.direction === "down"
      ? "text-red-400"
      : "text-gray-300";

  const arrow =
    trend?.direction === "up" ? "▲" : trend?.direction === "down" ? "▼" : "■";

  return (
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 shadow ring-1 ${ring}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">{title}</div>
        {icon ? <div className="opacity-80">{icon}</div> : null}
      </div>
      <div className="mt-1 text-3xl font-semibold text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {trendText && (
        <span className={`mt-2 inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs ${badge}`}>
          <span className={trendColor}>{arrow}</span>
          <span className={trendColor}>{trendText}</span>
        </span>
      )}
    </div>
  );
};

export default KPICard;




