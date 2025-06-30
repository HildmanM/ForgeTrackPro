import express from 'express';
import multer from 'multer';
import cors from 'cors';
import pdfParse from 'pdf-parse';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
let parsedPDFData = [];

app.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(fileBuffer);
    fs.unlinkSync(req.file.path); // clean up file

    const text = data.text;

    const jobs = text
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

    parsedPDFData = jobs;

    res.json({ success: true, count: jobs.length });
  } catch (error) {
    res.status(500).json({ error: 'PDF parse failed.' });
  }
});

app.get('/parsed-pdf', (req, res) => {
  res.json(parsedPDFData);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
