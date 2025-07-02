import React from 'react';

const inventory = [
  { id: 'I-001', item: 'H-Beams', quantity: 3, location: 'Yard A' },
  { id: 'I-002', item: 'Rebar', quantity: 8, location: 'Yard B' },
  { id: 'I-003', item: 'Steel Plates', quantity: 15, location: 'Shop Floor' },
];

const InventoryModule = () => {
  return (
    <div className="text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Inventory</h1>
      <table className="w-full table-auto bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="p-3 text-left">Item ID</th>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Location</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((inv) => (
            <tr key={inv.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="p-3">{inv.id}</td>
              <td className="p-3">{inv.item}</td>
              <td className="p-3">{inv.quantity}</td>
              <td className="p-3">{inv.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryModule;
