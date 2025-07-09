import { Router } from 'express';
import multer   from 'multer';
import pdf      from 'pdf-parse';
import XLSX     from 'xlsx';
import fs       from 'fs';
import path     from 'path';
import { saveJobs } from '../dataStore.js';

const router = new Router();
const UPLOADS = path.resolve('uploads');
fs.mkdirSync(UPLOADS, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOADS,
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext      = path.extname(req.file.originalname).toLowerCase();

    let rows;
    if (ext === '.pdf') {
      const buffer = fs.readFileSync(filePath);
      const data   = await pdf(buffer);
      // wrap PDF text in a single‐row array
      rows = [{ text: data.text }];
    } else if (ext === '.xls' || ext === '.xlsx') {
      const wb    = XLSX.readFile(filePath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // persist rows to our “DB”
    saveJobs(rows);
    return res.json({ rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;










