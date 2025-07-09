import express from 'express';
import cors    from 'cors';
import path    from 'path';

import uploadRoutes from './routes/upload.js';
import jobsRoutes   from './routes/jobs.js';

const app  = express();
const PORT = process.env.PORT || 10000;

app.use(cors({ origin: 'https://forgetrack.net' }));
app.use(express.json());

// static serves uploads if needed
app.use('/uploads', express.static(path.resolve('uploads')));

// our two API routers
app.use('/api', uploadRoutes);
app.use('/api', jobsRoutes);

// sanity check
app.get('/', (_, res) => res.send('Forge Backend Running'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});









