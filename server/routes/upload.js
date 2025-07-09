import { Router } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const router = new Router();

// ensure uploads folder
const UPLOAD_DIR = path.resolve('uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// name each file with timestamp + original name
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { path: filePath, originalname } = req.file;
    const ext = path.extname(originalname).toLowerCase();

    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return res.json({ text: data.text });
    }

    if (ext === '.xls' || ext === '.xlsx') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      return res.json({ rows: jsonData });
    }

    return res.status(400).json({ error: 'Unsupported file type' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Import failed', details: err.message });
  }
});

export default router;









