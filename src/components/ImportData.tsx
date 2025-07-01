import React, { useState } from "react";
import * as XLSX from "xlsx";

const ImportData = () => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(parsedData.slice(1)); // Skip headers
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Import Excel</h2>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} className="mb-4" />
      {fileName && <p>📄 {fileName}</p>}
      {excelData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full text-sm border-collapse border border-gray-700">
            <thead>
              <tr>
                {excelData[0].map((_, i) => (
                  <th key={i} className="border px-2 py-1 text-left text-gray-300">Column {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell: any, j: number) => (
                    <td key={j} className="border px-2 py-1 text-gray-100">{cell ?? ""}</td>
                  ))}
                </tr>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
);
};

export default ImportData;
