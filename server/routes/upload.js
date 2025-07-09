import { Router } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import XLSX from 'xlsx';

export let jobsData = [];             // in-memory store

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const mime = req.file.mimetype;
  if (mime === 'application/pdf') {
    const { text } = await pdf(req.file.buffer);
    // split PDF text by line, wrap in simple objects
    jobsData = text.split('\n').map(line => ({ text: line }));
    return res.json({ text: jobsData });
  }

  if (
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mime === 'application/vnd.ms-excel'
  ) {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    jobsData = XLSX.utils.sheet_to_json(sheet);
    return res.json({ rows: jobsData });
  }

  return res.status(400).json({ error: 'Unsupported file type' });
});

router.get('/', (req, res) => {
  res.json({ jobs: jobsData });
});

export default router;











