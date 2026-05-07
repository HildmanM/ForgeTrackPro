const fs = require("fs");
const pdfParse = require("pdf-parse");

function dedupe(arr, keyFn) {
  const seen = new Set();
  const out = [];
  for (const r of arr) {
    const k = keyFn(r);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(r);
    }
  }
  return out;
}

// very basic text scrapers for Tekla-style PDF exports
async function parsePdf(filePath) {
  const buf = fs.readFileSync(filePath);
  const data = await pdfParse(buf);
  const text = String(data.text || "");
  const lines = text
    .split(/\r?\n/)
    .map(x => x.trim())
    .filter(Boolean);

  const out = {
    jobs: [],
    inventory: [],
    clients: [],
    laborHours: []
  };

  for (const line of lines) {
    // job capture
    const jobMatch = line.match(/\b(?:JOB|Job)\s*#?\s*([A-Za-z0-9\-_/]+)/);
    if (jobMatch) {
      const jobNumber = jobMatch[1];
      out.jobs.push({
        jobNumber,
        name: null,
        status: null
      });
    }

    // inventory capture
    const invMatch = line.match(
      /\b(?:Part\s*Mark|PM)\s*[:#]?\s*([A-Za-z0-9\-_/]+).*?\b(?:Qty|QTY)\s*[:#]?\s*(\d+)/i
    );
    if (invMatch) {
      out.inventory.push({
        sku: null,
        partMark: invMatch[1],
        qty: Number(invMatch[2]),
        location: null
      });
    }

    // client capture
    const clientMatch = line.match(/\b(?:Client|Customer)\s*[:#]\s*(.+)$/i);
    if (clientMatch) {
      out.clients.push({
        clientId: null,
        name: clientMatch[1].trim(),
        email: null,
        phone: null
      });
    }

    // labor capture
    const laborMatch = line.match(
      /\bHours?\s*[:#]?\s*([0-9.]+).*?(?:JOB|Job)\s*#?\s*([A-Za-z0-9\-_/]+).*?\b(?:SEQ|Phase)\s*[:#]?\s*([A-Za-z0-9\-_/]+)/i
    );
    if (laborMatch) {
      out.laborHours.push({
        jobNumber: laborMatch[2],
        seq: laborMatch[3],
        employee: null,
        employeeId: null,
        date: null,
        hours: Number(laborMatch[1])
      });
    }
  }

  out.jobs = dedupe(out.jobs, r => r.jobNumber);
  return out;
}

module.exports = { parsePdf };
