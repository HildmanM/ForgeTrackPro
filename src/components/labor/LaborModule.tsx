import React, { useEffect, useState } from "react";
import { fetchLabor } from "../../services/api";

const LaborModule: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchLabor()
      .then(setRows)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Labor Hours</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Job #</th>
              <th className="px-4 py-2 text-left">Seq</th>
              <th className="px-4 py-2 text-left">Employee</th>
              <th className="px-4 py-2 text-left">Hours</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className={i % 2 ? "bg-gray-800" : "bg-gray-700/40"}
              >
                <td className="px-4 py-2">{r.jobNumber}</td>
                <td className="px-4 py-2">{r.seq}</td>
                <td className="px-4 py-2">{r.employee}</td>
                <td className="px-4 py-2">{r.hours}</td>
                <td className="px-4 py-2">{r.date}</td>
              </tr>
            ))}

            {!rows.length && (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500"
                  colSpan={5}
                >
                  No labor hours yet. Import data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaborModule;
