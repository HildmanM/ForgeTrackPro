// server/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import uploadRoutes from './routes/upload.js';
import dataStore from './dataStore.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Enable CORS ───────────────────────────────────────────────────────────────
// Allow your live frontend domain (and localhost for dev, if you like)
app.use(cors({
  origin: ['https://forgetrack.net', 'http://localhost:3000'],
}));

// ─── JSON Body Parsing ─────────────────────────────────────────────────────────
app.use(express.json());

// ─── Serve Uploaded Files ─────────────────────────────────────────────────────
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'server', 'uploads'))
);

// ─── File Upload & Parsing Routes ─────────────────────────────────────────────
app.use('/api', uploadRoutes);

// ─── Data Retrieval Endpoints ─────────────────────────────────────────────────
// Returns last‐uploaded Excel rows
app.get('/api/data/excel', (req, res) => {
  res.json(dataStore.excelData);
});

// Returns last‐uploaded PDF text
app.get('/api/data/pdf', (req, res) => {
  res.json({ text: dataStore.pdfText });
});

// ─── Default Health Check ─────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Forge Backend Running');
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



