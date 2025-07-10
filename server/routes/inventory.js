// server/routes/inventory.js
import { Router } from "express";
import { store } from "../dataStore.js";
const router = Router();

router.get("/", (req, res) => {
  // total hours, or array of entries:
  res.json({ labor: store.labor });
});

export default router;
