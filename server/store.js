const path = require("path");
const fs = require("fs");

let STORE_PATH = null;
let cache = {
  jobs: [],
  inventory: [],
  clients: [],
  laborHours: []
};

function initStore(dir) {
  STORE_PATH = path.join(dir, "store.json");
  if (fs.existsSync(STORE_PATH)) {
    try {
      cache = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
    } catch {
      // keep default empty cache if corrupt
    }
  } else {
    persist();
  }
}

function getStore() {
  return cache;
}

function persist() {
  if (!STORE_PATH) return;
  fs.writeFileSync(STORE_PATH, JSON.stringify(cache, null, 2));
}

// upsert rows based on keyFields
function upsertMany(collection, rows, keyFields) {
  if (!cache[collection]) cache[collection] = [];
  const existing = cache[collection];

  const indexMap = new Map(
    existing.map((row, i) => [
      keyFields.map(k => (row[k] ?? "")).join("|"),
      i
    ])
  );

  for (const row of rows) {
    const key = keyFields.map(k => (row[k] ?? "")).join("|");
    if (indexMap.has(key)) {
      existing[indexMap.get(key)] = {
        ...existing[indexMap.get(key)],
        ...row
      };
    } else {
      indexMap.set(key, existing.length);
      existing.push(row);
    }
  }
  cache[collection] = existing;
  persist();
}

// rollup KPIs
function computeKpis(s) {
  const totalJobs = s.jobs.length;
  const jobsCompleted = s.jobs.filter(
    j => (j.status || "").toLowerCase() === "completed"
  ).length;
  const totalClients = s.clients.length;
  const totalInventoryItems = s.inventory.length;
  const totalLaborHours = s.laborHours.reduce(
    (sum, r) => sum + (Number(r.hours) || 0),
    0
  );

  return {
    totalJobs,
    jobsCompleted,
    totalClients,
    totalInventoryItems,
    totalLaborHours
  };
}

module.exports = {
  initStore,
  getStore,
  upsertMany,
  computeKpis
};


