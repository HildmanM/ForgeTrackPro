import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/upload.js';  // ✅ Ensure this exists

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Fix: Allow your frontend to connect
app.use(cors({
  origin: 'https://forgetrack.net',  // ✅ Your live frontend domain
}));

// ✅ Serve Uploaded Files (Optional)
app.use('/uploads', express.static('./server/uploads'));

// ✅ Add Upload Route
app.use('/api', uploadRoutes);

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('Forge Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

