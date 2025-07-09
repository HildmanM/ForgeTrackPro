const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const upload = multer({
  dest: path.join(__dirname, '../uploads')
});

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const ext = path.extname(req.file.originalname).toLowerCase();
    let result;

    if (ext === '.pdf') {
      // parse PDF
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      result = { text: pdfData.text };
    } else if (ext === '.xlsx' || ext === '.xls') {
      // parse Excel
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // you get a 2d array here
      result = { rows: xlsx.utils.sheet_to_json(sheet, { header: 1 }) };
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    return res.json({ data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error processing file' });
  }
});

module.exports = router;






