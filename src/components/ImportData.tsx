import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Database,
  Search
} from 'lucide-react';
import axios from 'axios';

const ImportData = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiHost = window.location.hostname.includes('localhost')
        ? 'http://localhost:3001'
        : 'https://forge-backend-ljqa.onrender.com';

      const res = await axios.post(`${apiHost}/upload-excel`, formData);
      setParsedData(res.data.data || []);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Cloud Data Sync</h1>
        <p className="text-slate-400 mt-2">Import your Excel production dashboards or WKS data sheets to unify project tracking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 space-y-6">
            <div className="flex items-center space-x-3 text-emerald-400">
              <FileSpreadsheet size={24} />
              <h3 className="text-lg font-bold">Excel Source</h3>
            </div>

            <div
              className={`relative group border-2 border-dashed rounded-2xl p-10 transition-all duration-300 text-center
                ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-slate-500'}`}
            >
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {file ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto text-emerald-400">
                    <FileSpreadsheet size={24} />
                  </div>
                  <p className="text-white font-medium truncate px-4">{file.name}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto text-slate-400 group-hover:text-white transition-colors">
                    <Upload size={24} />
                  </div>
                  <p className="text-slate-400 group-hover:text-white transition-colors font-medium">Select Excel Disk</p>
                </div>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || status === 'uploading'}
              className="w-full premium-button !from-emerald-500 !to-teal-500 py-3 flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/10"
            >
              {status === 'uploading' ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Database size={18} />
              )}
              <span>Ingest Worksheet</span>
            </button>
          </div>

          <div className="glass-panel p-6 bg-emerald-500/5 border-emerald-500/20">
            <div className="flex items-center space-x-3 text-emerald-400 mb-3">
              <CheckCircle2 size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">Sync Ready</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your system is configured to auto-map columns for <strong>Trinity Steel Production Dashboards</strong> and <strong>WKS Data</strong>.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {parsedData.length > 0 ? (
            <div className="glass-panel p-6 animate-in fade-in slide-in-from-right-8 duration-700 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-bold text-white">Worksheet Preview</h3>
                  <div className="px-3 py-1 bg-slate-800 rounded-lg flex items-center space-x-2 border border-slate-700">
                    <Search size={14} className="text-slate-500" />
                    <input
                      placeholder="Filter rows..."
                      className="bg-transparent border-none text-xs text-slate-300 focus:ring-0 placeholder-slate-600"
                    />
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {parsedData.length} Rows Parsed
                </span>
              </div>

              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                  <thead className="sticky top-0 bg-slate-900 border-b border-slate-800">
                    <tr className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      {Object.keys(parsedData[0]).map((key) => (
                        <th key={key} className="px-4 py-3 first:rounded-l-xl last:rounded-r-xl bg-slate-800/50">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.map((row, i) => (
                      <tr key={i} className="bg-white/5 hover:bg-white/10 transition-colors group">
                        {Object.values(row).map((value: any, j) => (
                          <td key={j} className="px-4 py-3 first:rounded-l-xl last:rounded-r-xl text-slate-300 group-hover:text-white transition-colors">
                            {value?.toString()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="glass-panel h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-slate-600 border border-slate-700">
                <FileSpreadsheet size={40} />
              </div>
              <div className="space-y-2 max-w-xs">
                <h3 className="text-lg font-bold text-white">No Data Ingested</h3>
                <p className="text-sm text-slate-500">Sync your Excel dashboard to view the data matrix and commit changes to the ERP.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportData;
