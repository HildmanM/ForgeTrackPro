import React, { useEffect, useState } from "react";
import { fetchClients } from "../../services/api";

const ClientsModule: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchClients()
      .then(setRows)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Clients</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr
                key={i}
                className={i % 2 ? "bg-gray-800" : "bg-gray-700/40"}
              >
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.phone}</td>
              </tr>
            ))}

            {!rows.length && (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500"
                  colSpan={3}
                >
                  No clients yet. Import data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsModule;

