import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import XLSX from 'xlsx';
import { addJobs } from '../dataStore.js';

const upload = multer({ dest: '/tmp' });
const router = Router();

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const { path: tmpPath, originalname } = req.file;
    const ext = originalname.split('.').pop().toLowerCase();
    let text = '';

    if (ext === 'pdf') {
      const data = fs.readFileSync(tmpPath);
      const parsed = await pdfParse(data);
      text = parsed.text;
    } else if (['xlsx','xls'].includes(ext)) {
      const wb = XLSX.readFile(tmpPath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws);
      const imported = rows.map(r => ({
        id: r.id,
        client: r.client,
        status: r.status,
        completion: r.completion,
        dueDate: r.dueDate
      }));
      addJobs(imported);
      text = JSON.stringify(imported, null, 2);
    } else {
      throw new Error('Unsupported file type');
    }

    fs.unlinkSync(tmpPath);
    res.json({ text });
  } catch (e) {
    next(e);
  }
});

export default router;











