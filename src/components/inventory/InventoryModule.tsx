import React, { useEffect, useState } from "react";
import { fetchInventory } from "../../services/api";

const InventoryModule: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchInventory()
      .then(setRows)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Inventory</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">SKU</th>
              <th className="px-4 py-2 text-left">Part Mark</th>
              <th className="px-4 py-2 text-left">Qty</th>
              <th className="px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className={i % 2 ? "bg-gray-800" : "bg-gray-700/40"}
              >
                <td className="px-4 py-2">{r.sku}</td>
                <td className="px-4 py-2">{r.partMark}</td>
                <td className="px-4 py-2">{r.qty}</td>
                <td className="px-4 py-2">{r.location}</td>
              </tr>
            ))}

            {!rows.length && (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500"
                  colSpan={4}
                >
                  No inventory yet. Import data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryModule;
