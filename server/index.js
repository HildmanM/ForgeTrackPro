const path = require("path");
const fs = require("fs");
const os = require("os");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { initStore, getStore, upsertMany, computeKpis } = require("./store");
const { parseExcelOrCsv } = require("./parsers/excel");
const { parsePdf } = require("./parsers/pdf");

const app = express();
const PORT = process.env.PORT || 5000;

// allow frontend (edit domain for prod)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://forgetrack.net"
  ],
  credentials: true
}));
app.use(express.json());

// writable data dir
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
initStore(DATA_DIR);

// multer -> tempdir
const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, os.tmpdir()),
    filename: (_, file, cb) => {
      const safe = file.originalname.replace(/[^\w.\-]/g, "_");
      cb(null, Date.now() + "_" + safe);
    }
  }),
  limits: { fileSize: 40 * 1024 * 1024 } // 40MB/file
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// upload + parse
app.post("/api/upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ error: "no files uploaded" });
    }

    const merged = {
      jobs: [],
      inventory: [],
      clients: [],
      laborHours: []
    };

    for (const f of req.files) {
      const ext = path.extname(f.originalname).toLowerCase();
      if ([".xlsx", ".xls", ".csv"].includes(ext)) {
        const parsed = await parseExcelOrCsv(f.path);
        mergeInto(merged, parsed);
      } else if (ext === ".pdf") {
        const parsed = await parsePdf(f.path);
        mergeInto(merged, parsed);
      }
      try { fs.unlinkSync(f.path); } catch (_) {}
    }

    // write to store (upsert)
    upsertMany("jobs", merged.jobs, ["jobNumber"]);
    upsertMany("inventory", merged.inventory, ["sku", "partMark"]);
    upsertMany("clients", merged.clients, ["clientId", "name"]);
    upsertMany("laborHours", merged.laborHours,
      ["jobNumber", "employeeId", "date", "seq"]
    );

    const s = getStore();
    const kpis = computeKpis(s);

    res.json({
      ok: true,
      imported: {
        jobs: merged.jobs.length,
        inventory: merged.inventory.length,
        clients: merged.clients.length,
        laborHours: merged.laborHours.length
      },
      kpis
    });
  } catch (err) {
    console.error("upload error:", err);
    res.status(500).json({ error: "parse failed", detail: String(err?.message || err) });
  }
});

// data endpoints
app.get("/api/kpis", (_req, res) => {
  res.json(computeKpis(getStore()));
});

app.get("/api/jobs", (_req, res) => {
  res.json(getStore().jobs);
});

app.get("/api/inventory", (_req, res) => {
  res.json(getStore().inventory);
});

app.get("/api/clients", (_req, res) => {
  res.json(getStore().clients);
});

app.get("/api/labor", (_req, res) => {
  res.json(getStore().laborHours);
});

app.listen(PORT, () => {
  console.log(`ForgeTrack server running on ${PORT}`);
});

// helper
function mergeInto(base, incoming) {
  ["jobs", "inventory", "clients", "laborHours"].forEach(k => {
    if (incoming[k] && Array.isArray(incoming[k])) {
      base[k].push(...incoming[k]);
    }
  });
}













