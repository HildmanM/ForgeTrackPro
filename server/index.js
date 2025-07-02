const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload-pdf', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    res.json({ text: data.text });
  } catch (error) {
    console.error('PDF parse error:', error);
    res.status(500).json({ error: 'Failed to parse PDF' });
  } finally {
    fs.unlink(filePath, () => {});
  }
});

app.get('/', (req, res) => {
  res.send('ForgeTrack Backend is running.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
