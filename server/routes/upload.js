// server/routes/upload.js
import { Router } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import xlsx from "xlsx";
import { store } from "../dataStore.js";

const upload = multer();
const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;

    let jobs = [];

    // PDF Parsing
    if (fileType === "application/pdf") {
      const data = await pdfParse(fileBuffer);
      const lines = data.text.split("\n").map(line => line.trim()).filter(Boolean);

      for (let i = 0; i < lines.length; i += 6) {
        jobs.push({
          stationDate: lines[i],
          stationName: lines[i + 1],
          employee: lines[i + 2],
          dateCompleted: lines[i + 3],
          hours: parseFloat(lines[i + 4]) || 0,
          description: lines[i + 5],
        });
      }
    } 

    // Excel Parsing
    else if (
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel"
    ) {
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);

      jobs = jsonData.map(row => ({
        stationDate: row["Station Date"],
        stationName: row["Station Name"],
        employee: row["Employee"],
        dateCompleted: row["Date Completed"],
        hours: parseFloat(row["Hours"]) || 0,
        description: row["Description"],
      }));
    }

    // Unsupported file types
    else {
      return res.status(400).json({ error: "Unsupported file type." });
    }

    store.jobs = jobs;
    store.labor = jobs.map(job => ({ job: job.description, hours: job.hours }));

    res.json({ success: true, jobsCount: jobs.length });
  } catch (err) {
    console.error("Parsing Error:", err);
    res.status(500).json({ error: "File parsing failed." });
  }
});

export default router;














