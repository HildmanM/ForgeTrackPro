import React, { useState } from "react";
import { uploadFiles } from "../services/api";

const ImportData: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files) : [];
    setFiles(list);
  }

  async function handleUpload() {
    try {
      setBusy(true);
      setErrorMsg("");
      const res = await uploadFiles(files);
      setResult(res);
    } catch (err: any) {
      setErrorMsg(err?.message || String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Import Data</h1>
      <p className="text-sm text-gray-300">
        Upload Excel / CSV / PDF exports. They will be parsed and stored. Pages
        and KPIs update automatically.
      </p>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-lg space-y-4">
        <input
          type="file"
          multiple
          onChange={handleSelect}
          className="block text-sm text-gray-300"
        />

        <button
          onClick={handleUpload}
          disabled={!files.length || busy}
          className="px-4 py-2 rounded-md bg-blue-600 disabled:opacity-50 font-semibold text-sm"
        >
          {busy ? "Importing..." : "Upload & Parse"}
        </button>

        {errorMsg && (
          <div className="text-red-400 text-xs break-all">{errorMsg}</div>
        )}

        {result && (
          <div className="text-xs text-gray-300 whitespace-pre-wrap bg-black/40 p-3 rounded border border-gray-700">
            <div className="mb-2 font-semibold text-white">
              Import Summary
            </div>
            {JSON.stringify(result.imported, null, 2)}

            <div className="mt-4 mb-2 font-semibold text-white">
              KPIs After Import
            </div>
            {JSON.stringify(result.kpis, null, 2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportData;












