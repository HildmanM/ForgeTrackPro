// src/data/mockData.ts
export const kpiData = {
  jobsCompleted: { value: 128, trend: '+8%' },
  materialUsage: { value: '5.6 tons', trend: '-2%' },
  laborHours: { value: 1342, trend: '+5%' },
  efficiencyRate: { value: '92%', trend: '+4%' }
};

export const recentJobs = [
  { id: 'J-101', client: 'Alpha Steel', status: 'Completed', completion: 100, dueDate: '2025-06-25' },
  { id: 'J-102', client: 'Beta Fabrication', status: 'In Progress', completion: 75, dueDate: '2025-07-02' },
  { id: 'J-103', client: 'Gamma Works', status: 'Pending', completion: 0, dueDate: '2025-07-10' }
];

export const inventoryAlerts = [
  { id: 'A-01', item: 'H-Beams', quantity: 3, threshold: 5, status: 'Critical' },
  { id: 'A-02', item: 'Rebar', quantity: 8, threshold: 10, status: 'Low' }
];

export const monthlyProductionData = [
  { month: 'Jan', production: 240 },
  { month: 'Feb', production: 260 },
  { month: 'Mar', production: 300 },
  { month: 'Apr', production: 280 },
  { month: 'May', production: 320 }
];

export const jobStatusDistribution = [
  { name: 'Completed', value: 20 },
  { name: 'In Progress', value: 10 },
  { name: 'Pending', value: 5 }
];
