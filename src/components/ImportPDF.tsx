import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Database
} from 'lucide-react';
import axios from 'axios';

const ImportPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

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
      // Logic for both production and local testing
      const apiHost = window.location.hostname.includes('localhost')
        ? 'http://localhost:3001'
        : 'https://forge-backend-ljqa.onrender.com';

      const res = await axios.post(`${apiHost}/upload-pdf`, formData);
      setResult(res.data);
      setStatus('success');

      // Save for local dashboard persistence
      if (Array.isArray(res.data)) {
        localStorage.setItem('teklaData', JSON.stringify(res.data));
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Tekla Data Ingestion</h1>
        <p className="text-slate-400 mt-2">Upload your Tekla-generated PDFs to sync fabrication marks, labor hours, and job data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 space-y-6">
          <div className="flex items-center space-x-3 text-sky-400">
            <Upload size={24} />
            <h3 className="text-lg font-bold">Upload Source</h3>
          </div>

          <div
            className={`relative group border-2 border-dashed rounded-2xl p-10 transition-all duration-300 text-center
              ${file ? 'border-sky-500/50 bg-sky-500/5' : 'border-slate-700 hover:border-slate-500'}`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center mx-auto text-sky-400">
                  <FileText size={24} />
                </div>
                <p className="text-white font-medium truncate px-4">{file.name}</p>
                <p className="text-slate-500 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto text-slate-400 group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <p className="text-slate-400 group-hover:text-white transition-colors font-medium">Click or drag PDF here</p>
                <p className="text-slate-600 text-xs text-secondary uppercase tracking-widest">Supports Tekla Reports</p>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || status === 'uploading'}
            className="w-full premium-button py-3 flex items-center justify-center space-x-2 shadow-xl shadow-sky-500/10"
          >
            {status === 'uploading' ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Database size={18} />
                <span>Sync to ERP</span>
              </>
            )}
          </button>
        </div>

        <div className="glass-panel p-8 border-l-4 border-l-sky-500/50">
          <h3 className="text-lg font-bold text-white mb-6">Status & Feed</h3>
          <div className="space-y-6">
            <div className={`p-4 rounded-xl flex items-start space-x-4 transition-all duration-300
              ${status === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                status === 'error' ? 'bg-rose-500/10 border border-rose-500/20' : 'bg-slate-800/30'}`}>
              <div className={`p-2 rounded-lg ${status === 'success' ? 'text-emerald-400' :
                status === 'error' ? 'text-rose-400' : 'text-slate-500'}`}>
                {status === 'success' ? <CheckCircle2 size={20} /> :
                  status === 'error' ? <AlertCircle size={20} /> : <Loader2 size={20} />}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-bold ${status === 'success' ? 'text-emerald-400' :
                  status === 'error' ? 'text-rose-400' : 'text-slate-400'}`}>
                  {status === 'success' ? 'Sync Complete' :
                    status === 'error' ? 'Sync Failed' :
                      status === 'uploading' ? 'Analyzing PDF Structure' : 'Waiting for Input'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {status === 'success' ? `Successfully imported ${Array.isArray(result) ? result.length : 'all'} fabrication marks. Dashboard updated.` :
                    status === 'error' ? 'Could not parse the PDF structure. Please ensure it follows the standard Tekla report format.' :
                      status === 'uploading' ? 'Extracting text and identifying fabrication data patterns...' : 'System ready for telemetry sync.'}
                </p>
              </div>
            </div>

            {status === 'success' && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">
                  <span>Extracted Records</span>
                  <span>100%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full" />
                </div>
                <button
                  onClick={() => window.location.href = '/'}
                  className="mt-6 w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <span>Go to Overview</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {result && Array.isArray(result) && result.length > 0 && (
        <div className="glass-panel p-6 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Import Preview</h3>
            <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-xs font-bold rounded-full border border-sky-500/20 uppercase tracking-widest">
              {result.length} Marks Found
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="px-4 py-2">Job #</th>
                  <th className="px-4 py-2">Mark</th>
                  <th className="px-4 py-2">Station</th>
                  <th className="px-4 py-2">Employee</th>
                  <th className="px-4 py-2 text-right">Hours</th>
                </tr>
              </thead>
              <tbody>
                {result.slice(0, 10).map((row, i) => (
                  <tr key={i} className="bg-white/5 hover:bg-white/10 transition-colors">
                    <td className="px-4 py-3 rounded-l-xl font-medium text-white">{row.job}</td>
                    <td className="px-4 py-3 text-sky-400 font-bold">{row.mark}</td>
                    <td className="px-4 py-3 text-slate-300">{row.station}</td>
                    <td className="px-4 py-3 text-slate-300">{row.employee}</td>
                    <td className="px-4 py-3 rounded-r-xl text-right font-mono text-emerald-400">{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {result.length > 10 && (
              <div className="text-center mt-6 py-4 border-t border-slate-800">
                <p className="text-slate-500 text-xs">... and {result.length - 10} more records imported</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportPDF;
