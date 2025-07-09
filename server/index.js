import express from 'express';
import cors from 'cors';

import uploadRouter from './routes/upload.js';
import jobsRouter from './routes/jobs.js';

const PORT = process.env.PORT || 10000;
const app = express();

app.use(cors());
app.use(express.json());

// POST /api/import   →  parse PDF or XLSX into memory
app.use('/api/import', uploadRouter);

// GET  /api/jobs     →  return last-uploaded rows
app.use('/api/jobs', jobsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});









