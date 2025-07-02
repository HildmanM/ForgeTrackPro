import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

const PDFImport = () => {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleParsePDF = async () => {
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedarray = new Uint8Array(this.result as ArrayBuffer);
        const loadingTask = pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;

        const pages: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(' ');
          pages.push(pageText);
        }

        const combinedText = pages.join('\n');

        const jobs = combinedText
          .split(/Job #:/)
          .slice(1)
          .map((section) => {
            const jobNumber = section.match(/^(\d+)/)?.[1] ?? 'N/A';
            const mark = section.match(/Mark\s*:\s*([\w\-]+)/)?.[1] ?? 'N/A';

            const matches = [...section.matchAll(
              /(Python|Dragon|6x6 Angle Master|8x8 Angle Master|Plate Processor)\s+\d+\s+(\w+)\d{1,2}\/\d{1,2}\/\d{4}\s+([\d.]+)/
            )];

            return matches.map((match) => ({
              jobNumber,
              mark,
              station: match[1],
              employee: match[2],
              hours: parseFloat(match[3])
            }));
          })
          .flat();

        if (jobs.length === 0) {
          setError('No matching job data found in PDF.');
        }

        setParsedData(jobs);
      };

      reader.readAsArrayBuffer(selectedFile);
    } catch (err) {
      console.error(err);
      setError('Failed to parse PDF.');
    }
  };

  return (
    <div className="text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Import PDF</h1>

      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        <button
          onClick={handleParsePDF}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Upload PDF
        </button>
      </div>

      {error && <div className="text-red-400">{error}</div>}

      {parsedData.length > 0 && (
        <div className="overflow-x-auto mt-6 bg-gray-800 p-4 border border-gray-700 rounded-lg">
          <h2 className="text-lg mb-3">Parsed PDF Data</h2>
          <table className="min-w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="px-3 py-2 text-left">Job #</th>
                <th className="px-3 py-2 text-left">Mark</th>
                <th className="px-3 py-2 text-left">Station</th>
                <th className="px-3 py-2 text-left">Employee</th>
                <th className="px-3 py-2 text-left">Hours</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="px-3 py-2">{row.jobNumber}</td>
                  <td className="px-3 py-2">{row.mark}</td>
                  <td className="px-3 py-2">{row.station}</td>
                  <td className="px-3 py-2">{row.employee}</td>
                  <td className="px-3 py-2">{row.hours.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PDFImport;



