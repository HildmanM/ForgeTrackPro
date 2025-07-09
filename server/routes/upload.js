import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import pdfParse from 'pdf-parse';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // 1) Read the uploaded PDF from disk
    const dataBuffer = fs.readFileSync(req.file.path);
    // 2) Parse with pdf-parse
    const { text } = await pdfParse(dataBuffer);
    // 3) Send raw text back to front-end
    res.json({ text });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Error processing file');
  }
});

export default router;





