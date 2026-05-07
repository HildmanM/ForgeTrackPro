import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';
import pdfParse from 'pdf-parse-fixed';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Limit uploads to 10 per IP per 15 minutes
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit of upload requests per windowMs
  message: { message: 'Too many uploads from this IP, please try again after 15 minutes.' }
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/'),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

router.post('/api/upload', uploadLimiter, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

  const ext = path.extname(req.file.originalname).toLowerCase();
  const filePath = req.file.path;

  try {
    let parsedData: any = {};

    if (ext === '.xlsx' || ext === '.xls') {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      parsedData = {
        type: 'excel',
        data: sheet
      };
    } else if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(dataBuffer);
      parsedData = {
        type: 'pdf',
        data: parsed.text
      };
    } else {
      return res.status(400).json({ message: 'Unsupported file format.' });
    }

    // Cache or save parsedData for frontend retrieval
    fs.writeFileSync('uploads/lastParsed.json', JSON.stringify(parsedData, null, 2));

    res.json({ message: 'File uploaded and parsed successfully.', data: parsedData });
  } catch (err) {
    console.error('Upload parse error:', err);
    res.status(500).json({ message: 'Error parsing uploaded file.' });
  }
});

export default router;
