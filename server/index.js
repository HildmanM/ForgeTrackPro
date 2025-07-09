import express from 'express';
import cors from 'cors';
import path from 'path';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1) Allow only your frontend domain
app.use(cors({ origin: 'https://forgetrack.net' }));

// 2) If you ever need JSON bodies
app.use(express.json());

// 3) Serve uploaded files (optional)
app.use('/uploads', express.static(path.join(process.cwd(), 'server', 'uploads')));

// 4) Mount our upload route under /api
app.use('/api', uploadRoutes);

// 5) Healthcheck
app.get('/', (_req, res) => res.send('Forge Backend Running'));

app.listen(PORT, () => {
  console.log(`🔥 Server listening on port ${PORT}`);
});




