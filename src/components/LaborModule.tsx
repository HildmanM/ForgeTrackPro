import React from 'react';

const LaborModule = () => {
  const data = JSON.parse(localStorage.getItem('teklaData') || '[]');
  const byEmployee: Record<string, number> = {};

  data.forEach((r: any) => {
    if (!byEmployee[r.employee]) byEmployee[r.employee] = 0;
    byEmployee[r.employee] += r.hours;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Labor Hours</h1>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg">
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="py-2">Employee</th>
              <th className="py-2">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(byEmployee).map(([name, hours], idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="py-2">{name}</td>
                <td className="py-2">{hours.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaborModule;


