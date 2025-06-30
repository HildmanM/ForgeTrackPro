import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

const PDFImport = () => {
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

      const allText: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str);
        allText.push(strings.join(' '));
      }

      const fullText = allText.join('\n');
      const rows = fullText
        .split(/Job #:/)
        .slice(1)
        .map((block) => {
          const jobMatch = block.match(/^(\d+)/);
          const jobNumber = jobMatch ? jobMatch[1] : 'Unknown';

          const markMatch = block.match(/Mark\s*:\s*([\w\-]+)/);
          const mark = markMatch ? markMatch[1] : 'Unknown';

          const stationMatches = [...block.matchAll(/(Python|Dragon|6x6 Angle Master|8x8 Angle Master|Plate Processor)\s+\d+\s+(\w+)\d+\/\d+\/\d+\s+([\d.]+)/g)];

          return stationMatches.map((match) => ({
            jobNumber,
            mark,
            station: match[1],
            employee: match[2],
            hours: parseFloat(match[3]),
          }));
        })
        .flat();

      setParsedData(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">PDF Import: Completed Station Details</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handlePDFUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />

      {parsedData.length > 0 && (
        <div className="overflow-x-auto mt-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg mb-3">Parsed Results</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="px-3 py-2">Job #</th>
                <th className="px-3 py-2">Mark</th>
                <th className="px-3 py-2">Station</th>
                <th className="px-3 py-2">Employee</th>
                <th className="px-3 py-2">Hours</th>
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
