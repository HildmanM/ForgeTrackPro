import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://forgetrack.net',
}));

app.use('/uploads', express.static('./server/uploads'));
app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Forge Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


