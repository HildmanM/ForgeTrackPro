import fs from 'fs';
import path from 'path';

const DB_DIR  = path.resolve('data');
const DB_FILE = path.join(DB_DIR, 'jobs.json');

export function getJobs() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

export function saveJobs(rows) {
  fs.mkdirSync(DB_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(rows, null, 2));
  return rows;
}
