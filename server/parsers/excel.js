const fs = require("fs");
const XLSX = require("xlsx");

function toNum(v) {
  const n = Number(String(v || "").replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function pick(o, keys) {
  for (const k of keys) {
    if (o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  }
  return "";
}

function parseExcelOrCsv(filePath) {
  const buf = fs.readFileSync(filePath);
  const wb = XLSX.read(buf, { type: "buffer" });

  const out = {
    jobs: [],
    inventory: [],
    clients: [],
    laborHours: []
  };

  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

    const nameLow = sheetName.toLowerCase();

    // jobs
    if (nameLow.includes("job")) {
      rows.forEach(r => {
        const jobNumber = pick(r, ["Job", "Job #", "Job Number", "JOB", "JOB #", "JobNumber"]);
        if (!jobNumber) return;
        const name = pick(r, ["Name", "Job Name", "Project", "Description"]);
        const status = pick(r, ["Status", "STATE"]);
        out.jobs.push({
          jobNumber: String(jobNumber).trim(),
          name,
          status
        });
      });
      continue;
    }

    // inventory
    if (
      nameLow.includes("invent") ||
      nameLow.includes("stock") ||
      nameLow.includes("part")
    ) {
      rows.forEach(r => {
        const sku = pick(r, ["SKU", "Part", "PartNo", "Item", "Item #", "Material"]);
        const partMark = pick(r, ["Part Mark", "Mark", "Piece Mark", "PartMark"]);
        const qty = toNum(pick(r, ["Qty", "QTY", "Quantity"]));
        const location = pick(r, ["Location", "Bin", "Rack"]);
        if (!(sku || partMark)) return;
        out.inventory.push({
          sku,
          partMark,
          qty,
          location
        });
      });
      continue;
    }

    // clients
    if (
      nameLow.includes("client") ||
      nameLow.includes("cust") ||
      nameLow.includes("customer")
    ) {
      rows.forEach(r => {
        const name = pick(r, ["Client", "Client Name", "Customer", "Customer Name", "Name"]);
        if (!name) return;
        const clientId = pick(r, ["Client ID", "Customer ID", "ID"]);
        const email = pick(r, ["Email", "E-Mail"]);
        const phone = pick(r, ["Phone", "Phone Number"]);
        out.clients.push({
          clientId,
          name,
          email,
          phone
        });
      });
      continue;
    }

    // labor hours
    if (
      nameLow.includes("labor") ||
      nameLow.includes("hour") ||
      nameLow.includes("time") ||
      nameLow.includes("timesheet")
    ) {
      rows.forEach(r => {
        const jobNumber = pick(r, ["Job", "Job #", "Job Number"]);
        const seq = pick(r, ["SEQ", "Phase", "Sequence"]);
        const employee = pick(r, ["Employee", "Emp", "Name", "First Last"]);
        const employeeId = pick(r, ["Emp ID", "Employee ID", "ID"]);
        const date = pick(r, ["Date", "Work Date"]);
        const hours = toNum(pick(r, ["Hours", "Hrs", "OT Hours", "OT"]));
        if (!jobNumber || !hours) return;
        out.laborHours.push({
          jobNumber,
          seq,
          employee,
          employeeId,
          date,
          hours
        });
      });
      continue;
    }

    // fallback: try infer jobs by columns if sheet name is generic
    rows.forEach(r => {
      const jobNumber = pick(r, ["Job", "Job #", "Job Number", "JOB", "JOB #", "JobNumber"]);
      if (!jobNumber) return;
      const name = pick(r, ["Name", "Job Name", "Project", "Description"]);
      const status = pick(r, ["Status", "STATE"]);
      out.jobs.push({
        jobNumber: String(jobNumber).trim(),
        name,
        status
      });
    });
  }

  return out;
}

module.exports = { parseExcelOrCsv };
