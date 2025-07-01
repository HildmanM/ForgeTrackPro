import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import parsePDF from "./pdf-parse";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(fileUpload());

// PDF Upload Endpoint
app.post("/api/upload-pdf", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.files.file as fileUpload.UploadedFile;
    const buffer = file.data;

    const result = await parsePDF(buffer);
    res.json(result);
  } catch (err) {
    console.error("Error processing PDF:", err);
    res.status(500).send("Failed to process PDF.");
  }
});

// ✅ Remove this — causes deployment failure
// parsePDF('./test/data/05-versions-space.pdf');

app.listen(PORT, () => {
  console.log(`PDF server listening on port ${PORT}`);
});







