import { Router } from "express";
import { store } from "../dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ inventory: store.inventory || [] });
});

export default router;

