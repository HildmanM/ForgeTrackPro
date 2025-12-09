import React, { useEffect, useState } from "react";
import { fetchKpis } from "../services/api";

const Card = ({
  label,
  value
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
    <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">
      {label}
    </div>
    <div className="text-3xl font-semibold text-white">{value ?? "-"}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<any | null>(null);

  useEffect(() => {
    fetchKpis().then(setKpis).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ForgeTrack Dashboard</h1>
        <div className="text-xs text-gray-400">
          Live data from uploaded files
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card label="Jobs" value={kpis?.totalJobs} />
        <Card label="Jobs Completed" value={kpis?.jobsCompleted} />
        <Card label="Clients" value={kpis?.totalClients} />
        <Card label="Labor Hours" value={kpis?.totalLaborHours} />
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg text-sm text-gray-300">
        <p>
          Import new Tekla / Excel / PDF data on the{" "}
          <span className="text-white font-semibold">Import Data</span> page.
          The dashboard and all pages update automatically.
        </p>
      </div>
    </div>
  );
}






