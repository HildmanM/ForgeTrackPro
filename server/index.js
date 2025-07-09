const express = require('express');
const cors = require('cors');
const path = require('path');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// allow your front-end domain to talk here:
app.use(cors({
  origin: 'https://forgetrack.net'
}));

// serve any saved files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// all our upload/parsing lives under /api
app.use('/api', uploadRoutes);

// health-check
app.get('/', (req, res) => {
  res.send('Forge Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





