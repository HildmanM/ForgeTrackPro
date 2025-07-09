import path from "node:path";
import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload.js";
import jobsRoute from "./routes/jobs.js";

const app = express();

// allow your front-end to call the API
app.use(cors());
app.use(express.json());

// wire up your API routes
app.use("/api/import", uploadRoute);
app.use("/api/jobs", jobsRoute);

// serve the Vite build output
const distDir = path.resolve("dist");
app.use(express.static(distDir));

// single-page-app fallback:
app.get("*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});











