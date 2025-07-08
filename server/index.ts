import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/upload.js';  // ✅ Add this line

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://forgetrack.net',  // ✅ Your actual frontend domain
}));

// Serve uploaded files (optional)
app.use('/uploads', express.static('./server/uploads'));

// ✅ Register Upload Route
app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Forge Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








