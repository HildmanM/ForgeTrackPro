import { Router } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const router = new Router();
const UPLOAD_DIR = path.resolve('uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { path: filePath, originalname } = req.file;
    const ext = path.extname(originalname).toLowerCase();

    if (ext === '.pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdf(buffer);
      return res.json({ text: data.text });
    }

    if (ext === '.xls' || ext === '.xlsx') {
      const wb = XLSX.readFile(filePath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      return res.json({ rows });
    }

    return res.status(400).json({ error: 'Unsupported file type' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Import failed', details: err.message });
  }
});

export default router;










