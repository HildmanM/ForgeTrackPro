import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { parseTeklaPDF } from './utils/pdfParser.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload/pdf', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await parseTeklaPDF(file.path);
    return res.status(200).json(result);
  } catch (err) {
    console.error('PDF parse error:', err);
    return res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

app.get('/', (_req: any, res: any) => {
  res.status(200).send('ForgeTrack Backend Running');
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});






