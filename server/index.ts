import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Allow Netlify frontend to connect
app.use(cors({
  origin: 'https://forgetrack.net',
  credentials: true,
}));

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

// 📁 Your endpoints (example)
app.post('/upload-excel', require('./utils/excelParser'));
app.post('/upload-pdf', require('./utils/pdfParser'));

// 🔁 Default route
app.get('/', (_req, res) => {
  res.send('ForgeTrack backend running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








