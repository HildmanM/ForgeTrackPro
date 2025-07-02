// server/index.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Allow all origins (or restrict to your domain)
app.use(cors({
  origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

// ✅ PDF Upload Route
app.post('/upload-pdf', upload.single('file'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    res.json({ text: data.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'PDF parsing failed' });
  }
});

// ✅ Excel Upload Route
app.post('/upload-excel', upload.single('file'), (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    res.json({ data: jsonData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Excel parsing failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

