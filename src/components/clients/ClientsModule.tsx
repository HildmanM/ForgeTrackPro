import React from 'react';

const clients = [
  { id: 'C-001', name: 'Alpha Steel', contact: 'John Doe', phone: '555-1234' },
  { id: 'C-002', name: 'Beta Fabrication', contact: 'Jane Smith', phone: '555-5678' },
  { id: 'C-003', name: 'Gamma Works', contact: 'Alan Johnson', phone: '555-9012' },
];

const ClientsModule = () => {
  return (
    <div className="text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Clients</h1>
      <table className="w-full table-auto bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="p-3 text-left">Client ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="p-3">{client.id}</td>
              <td className="p-3">{client.name}</td>
              <td className="p-3">{client.contact}</td>
              <td className="p-3">{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsModule;
