import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDb() {
  if (db) return db;

  db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_number TEXT,
      mark TEXT,
      station TEXT,
      employee TEXT,
      hours REAL,
      date TEXT,
      source TEXT -- 'tekla', 'excel', 'access'
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_name TEXT,
      quantity REAL,
      unit TEXT,
      last_updated TEXT
    );
  `);

  return db;
}
