import React from 'react';

const laborRecords = [
  { id: 'L-001', employee: 'John Carter', job: 'J-101', hours: 8, date: '2025-06-28' },
  { id: 'L-002', employee: 'Samantha Ray', job: 'J-102', hours: 6.5, date: '2025-06-28' },
  { id: 'L-003', employee: 'Mike Lee', job: 'J-103', hours: 7, date: '2025-06-27' },
];

const LaborModule = () => {
  return (
    <div className="text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Labor Hours</h1>
      <table className="w-full table-auto bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="p-3 text-left">Record ID</th>
            <th className="p-3 text-left">Employee</th>
            <th className="p-3 text-left">Job</th>
            <th className="p-3 text-left">Hours</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {laborRecords.map((rec) => (
            <tr key={rec.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="p-3">{rec.id}</td>
              <td className="p-3">{rec.employee}</td>
              <td className="p-3">{rec.job}</td>
              <td className="p-3">{rec.hours}</td>
              <td className="p-3">{rec.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaborModule;



