import { Router } from "express";
import XLSX from "xlsx";

const router = Router();

router.get("/", (req, res) => {
  // load + parse your spreadsheet (for demo we return an empty array)
  res.json({ jobs: [] });
});

export default router;


