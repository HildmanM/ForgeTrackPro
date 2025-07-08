export const kpiData = {
  jobsCompleted: { value: 125, trend: '+5%' },
  materialUsage: { value: '7,500 lbs', trend: '-2%' },
  laborHours: { value: 3200, trend: '+3%' },
  efficiencyRate: { value: '87%', trend: '+1%' },
};

export const recentJobs = [
  { id: 'J-1001', client: 'ABC Corp', status: 'Completed', completion: 100, dueDate: '2025-07-01' },
  { id: 'J-1002', client: 'XYZ Ltd', status: 'In Progress', completion: 75, dueDate: '2025-07-10' },
];

export const inventoryAlerts = [
  { id: 'I-2001', item: 'Steel Beams', quantity: 5, threshold: 10, status: 'Critical' },
  { id: 'I-2002', item: 'Bolts', quantity: 12, threshold: 15, status: 'Low' },
];

export const monthlyProductionData = [
  { month: 'Jan', production: 500 },
  { month: 'Feb', production: 700 },
  { month: 'Mar', production: 600 },
  { month: 'Apr', production: 800 },
];

export const jobStatusDistribution = [
  { name: 'Completed', value: 60 },
  { name: 'In Progress', value: 30 },
  { name: 'Delayed', value: 10 },
];


