import { storage } from "../server/storage";
import { pool } from "../server/db";

// One-off seed for a fresh database (e.g. production on Vercel):
//   DATABASE_URL=... npm run db:seed
async function main() {
  await storage.seedData();
  console.log("seed done");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
