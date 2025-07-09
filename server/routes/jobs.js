import { Router } from 'express';
import { jobsData } from './upload.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ jobs: jobsData });
});

export default router;
