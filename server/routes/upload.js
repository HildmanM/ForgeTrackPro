import { Router } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";

const upload = multer();
const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    // apply your parsing logic; here we just echo back the raw text
    res.json({ text: data.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF parsing failed" });
  }
});

export default router;











