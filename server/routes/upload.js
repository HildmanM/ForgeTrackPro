import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';
import pdfParse from 'pdf-parse';
import dataStore from '../dataStore.js';        // <– NEW

const router = express.Router();

// sanitize filenames
const cleanFileName = (name) => name.replace(/[^a-zA-Z0-9.\-_]/g, '_');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './server/uploads/';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeName = cleanFileName(file.originalname);
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = req.file.path;
  const ext = path.extname(filePath).toLowerCase();

  try {
    let parsedData;

    if (ext === '.xlsx' || ext === '.xls') {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      parsedData = xlsx.utils.sheet_to_json(sheet);
      dataStore.excelData = parsedData;        // <– STORE EXCEL
    } else if (ext === '.pdf') {
      const fileBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(fileBuffer);
      parsedData = pdfData.text;
      dataStore.pdfText = parsedData;          // <– STORE PDF
    } else {
      return res.status(400).json({ message: 'Unsupported file type.' });
    }

    return res.status(200).json({
      message: 'File uploaded and parsed successfully',
      filename: req.file.filename,
      data: parsedData,
    });
  } catch (err) {
    console.error('Error during file parsing:', err);
    return res.status(500).json({ message: 'Error parsing file.' });
  }
});

export default router;





