import path from "node:path";
import express from "express";
import cors from "cors";

import uploadRoute from "./routes/upload.js";
import jobsRoute   from "./routes/jobs.js";
import laborRoute  from "./routes/labor.js";
// import inventoryRoute from "./routes/inventory.js";

const app = express();
app.use(cors());
app.use(express.json());

// API
app.use("/api/import", uploadRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/labor", laborRoute);
// app.use("/api/inventory", inventoryRoute);

// Serve your Vite build
const DIST = path.resolve("dist");
app.use(express.static(DIST));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));












