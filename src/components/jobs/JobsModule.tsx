import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../services/api";

const JobsModule: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchJobs()
      .then(setRows)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Jobs</h1>
      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Job #</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((j, i) => (
              <tr
                key={i}
                className={i % 2 ? "bg-gray-800" : "bg-gray-700/40"}
              >
                <td className="px-4 py-2">{j.jobNumber}</td>
                <td className="px-4 py-2">{j.name}</td>
                <td className="px-4 py-2">{j.status}</td>
              </tr>
            ))}

            {!rows.length && (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500"
                  colSpan={3}
                >
                  No jobs yet. Import data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsModule;









