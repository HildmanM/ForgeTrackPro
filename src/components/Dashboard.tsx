import { useEffect, useState } from 'react';
import KPICard from './KPICard';
import Chart from './Chart';
import JobTable from './JobTable';
import axios from 'axios';

type ExcelRow = {
  [key: string]: string | number;
};

export default function Dashboard() {
  const [parsedData, setParsedData] = useState<ExcelRow[]>([]);
  const [pdfText, setPdfText] = useState('');

  useEffect(() => {
    axios.get('/uploads/lastParsed.json')
      .then(res => {
        if (res.data.type === 'excel') {
          setParsedData(res.data.data);
        } else if (res.data.type === 'pdf') {
          setPdfText(res.data.data);
        }
      })
      .catch(() => setParsedData([]));
  }, []);

  const totalJobs = parsedData.length;
  const jobNames = parsedData.map(row => row['Job Name'] || row['Job'] || 'Unknown');
  const uniqueClients = new Set(parsedData.map(row => row['Client'] || 'Client')).size;
  const inventoryItems = parsedData.length;
  const totalHours = parsedData.reduce((sum, row) => {
    const val = typeof row['Hours'] === 'number' ? row['Hours'] : parseFloat(row['Hours'] as string);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Jobs" value={totalJobs.toString()} />
        <KPICard title="Unique Clients" value={uniqueClients.toString()} />
        <KPICard title="Inventory Items" value={inventoryItems.toString()} />
        <KPICard title="Total Hours" value={totalHours.toFixed(2)} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart data={parsedData} />
        <JobTable data={parsedData} />
      </div>
      {pdfText && (
        <div className="bg-zinc-800 p-4 rounded shadow text-white whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2">Parsed PDF Text</h2>
          {pdfText}
        </div>
      )}
    </div>
  );
}






