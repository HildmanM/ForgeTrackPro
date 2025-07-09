import express from 'express';
import cors from 'cors';
import path from 'path';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 10000;

// allow your front-end domain to hit this API:
app.use(cors({ origin: 'https://forgetrack.net' }));
app.use(express.json());

// serve uploaded files if you ever need them:
app.use('/uploads', express.static(path.resolve('uploads')));

// our upload + parse endpoint:
app.use('/api', uploadRoutes);

// health-check
app.get('/', (_, res) => res.send('Forge Backend Running'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});







