import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Clean filenames to avoid issues (spaces, special characters)
const cleanFileName = (name) => {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './server/uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeName = cleanFileName(file.originalname);
    const timestamp = Date.now();
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log('Uploaded file:', req.file.filename);
  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
  });
});

export default router;

