import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { parseTeklaPDF } from './utils/pdfParser';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload/pdf', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const result = await parseTeklaPDF((req.file as Express.Multer.File).path);
    res.json(result);
  } catch (err) {
    console.error('PDF parse error:', err);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

app.get('/', (_req: Request, res: Response) => {
  res.send('ForgeTrack Backend Running');
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});


