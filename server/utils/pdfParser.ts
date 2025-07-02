import fs from 'fs';
import pdf from 'pdf-parse';

/**
 * Parses a Tekla-generated PDF and extracts job, mark, employee, hours, and station data.
 * @param filePath The absolute file path to the uploaded PDF.
 * @returns An array of structured job records.
 */
export async function parseTeklaPDF(filePath: string): Promise<any[]> {
  const dataBuffer = fs.readFileSync(filePath);
  const parsed = await pdf(dataBuffer);
  const lines = parsed.text.split('\n');
  const results: any[] = [];

  let job = '';
  let mark = '';

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith('Job #:')) {
      const jobMatch = line.match(/Job #:\s*(\d+)/);
      const markMatch = line.match(/Mark\s*:\s*(\S+)/);
      job = jobMatch ? jobMatch[1] : '';
      mark = markMatch ? markMatch[1] : '';
    }

    if (line.match(/(Python|Dragon|Master)/i) && line.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
      const stationMatch = line.match(/^(.*?)\s+\d+\s+/);
      const empMatch = line.match(/\s([a-zA-Z0-9]+)\d{1,2}\/\d{1,2}\/\d{4}/);
      const hoursMatch = line.match(/(\d+\.\d{2})$/);

      if (stationMatch && empMatch && hoursMatch) {
        results.push({
          job,
          mark,
          station: stationMatch[1].trim(),
          employee: empMatch[1],
          hours: parseFloat(hoursMatch[1])
        });
      }
    }
  }

  fs.unlinkSync(filePath);
  return results;
}



