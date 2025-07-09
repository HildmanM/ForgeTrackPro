import { Router } from 'express';
import { jobs } from '../dataStore.js';
const router = Router();

router.get('/', (_req, res) => {
  res.json({ jobs });
});

export default router;

