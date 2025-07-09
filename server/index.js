const express = require('express');
const cors = require('cors');
const path = require('path');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow your front-end domain
app.use(cors({ origin: 'https://forgetrack.net' }));

// Static folder (if you want to serve saved files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// All upload/parsing under /api
app.use('/api', uploadRoutes);

// Health check
app.get('/', (req, res) => res.send('Forge Backend Running'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





