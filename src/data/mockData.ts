export const kpiData = {
  jobsCompleted: { value: 23, trend: '+3%' },
  materialUsage: { value: '14,500 lbs', trend: '+5%' },
  laborHours: { value: 245, trend: '-2%' },
  efficiencyRate: { value: '91%', trend: '+1%' },
};

export const recentJobs = [
  { id: 'FT-001', client: 'ABC Construction', status: 'Completed', completion: 100, dueDate: '2024-06-15' },
  { id: 'FT-002', client: 'XYZ Fabricators', status: 'In Progress', completion: 80, dueDate: '2024-07-01' },
  { id: 'FT-003', client: 'Big Steel', status: 'Pending', completion: 0, dueDate: '2024-08-05' },
];

export const inventoryAlerts = [
  { id: 'INV-1', item: 'HSS 8x8x1/2', quantity: 2, threshold: 5, status: 'Critical' },
  { id: 'INV-2', item: 'PL 1/2x12', quantity: 6, threshold: 10, status: 'Low' },
];

export const monthlyProductionData = [
  { month: 'Jan', production: 1200 },
  { month: 'Feb', production: 1340 },
  { month: 'Mar', production: 1580 },
  { month: 'Apr', production: 1500 },
];

export const jobStatusDistribution = [
  { name: 'Completed', value: 5 },
  { name: 'In Progress', value: 8 },
  { name: 'Pending', value: 3 },
];


