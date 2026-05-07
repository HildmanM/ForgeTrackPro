import { Router } from "express";
import { store } from "../dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ labor: store.labor || [] });
});

export default router;

