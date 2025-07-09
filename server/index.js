import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import importRoute from './routes/upload.js';
import jobsRoute from './routes/jobs.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/import', importRoute);
app.use('/api/jobs', jobsRoute);

// serve the Vite-built SPA
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Server listening on port ${port}`));










