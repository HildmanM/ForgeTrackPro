import { Router } from "express";
import { store } from "../dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ jobs: store.jobs || [] });
});

export default router;





