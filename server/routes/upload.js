const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// destination folder for multer
const upload = multer({
  dest: path.join(__dirname, '../uploads')
});

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const ext = path.extname(req.file.originalname).toLowerCase();
    let output;

    if (ext === '.pdf') {
      // PDF parsing
      const buffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(buffer);
      output = { text: pdfData.text };
    } else if (ext === '.xlsx' || ext === '.xls') {
      // Excel parsing
      const workbook = xlsx.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      output = { rows };
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    return res.json({ data: output });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error processing file' });
  }
});

module.exports = router;







