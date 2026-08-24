// scripts/seedAdmin.js — opretter én admin-bruger
// Kør med: node scripts/seedAdmin.js <brugernavn> <adgangskode>
import "dotenv/config";
import mongoose from "../db.js";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.error("Brug: node scripts/seedAdmin.js <brugernavn> <adgangskode>");
  process.exit(1);
}

async function seedAdmin() {
  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`Admin "${username}" findes allerede`);
    await mongoose.connection.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await new Admin({ username, password: hashedPassword }).save();
  console.log(`Admin "${username}" oprettet`);

  await mongoose.connection.close();
}

seedAdmin();
