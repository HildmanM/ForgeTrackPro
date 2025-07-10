// server/routes/upload.js
import { Router } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { store } from "../dataStore.js";

const upload = multer();
const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    const lines = data.text.split("\n").map(l => l.trim()).filter(Boolean);

    // TODO – you’ll want to split `lines` into real “records”:
    // here’s a super-naive example that every 6 lines is one job:
    const jobs = [];
    for (let i = 0; i < lines.length; i += 6) {
      jobs.push({
        stationDate:   lines[i + 0],
        stationName:   lines[i + 1],
        employee:      lines[i + 2],
        dateCompleted: lines[i + 3],
        hours:         parseFloat(lines[i + 4]) || 0,
        description:   lines[i + 5],
      });
    }

    // Persist into our in-memory store
    store.jobs = jobs;

    // (optionally derive inventory & labor entries too)
    store.labor = jobs.map(j => ({ job: j.description, hours: j.hours }));
    // e.g. store.inventory = [...] 

    res.json({ success: true, jobsCount: jobs.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF parsing failed" });
  }
});

export default router;












