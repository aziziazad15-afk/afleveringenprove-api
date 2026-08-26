// scripts/seedAdmin.js — opretter én admin-bruger
// Kør med: node scripts/seedAdmin.js <brugernavn> <adgangskode>

import "dotenv/config"; // læser jeres .env-fil og putter værdierne ind i process.env. Uden den ville process.env.DB være undefined. 
import mongoose from "../db.js"; // kører hele db.js og os henter mongoose
import bcrypt from "bcrypt"; // laver kodeord om til en hash, der ikke kan laves tilbage til det oprindelige kodeord.
import Admin from "../models/Admin.js";


const [username, password] = process.argv.slice(2);  // 

//stopper scriptet med det samme og viser en hjælpebesked, hvis du glemte at skrive brugernavn/kodeord.
if (!username || !password) {
  console.error("Brug: node scripts/seedAdmin.js <brugernavn> <adgangskode>");
  process.exit(1);
}

// her siger vi async vent på data og await vent på Admin finder username og under laver vi en if til at se om det findes men du må godt forklar mere til denne. 
async function seedAdmin() { 
  const existing = await Admin.findOne({ username }); //spørger databasen "findes dette navn retuner findes allerede eller null.
  if (existing) {
    console.log(`Admin "${username}" findes allerede`);
    await mongoose.connection.close();
    return;
  }

  // Her bruger vi bcrypt til at gøre kundenes kode sikkker ved at blokker den ved ik det med talet 10 og heller så meget de andre forklar meget mere 
  const hashedPassword = await bcrypt.hash(password, 10); // jeg valger 10 fordi den er god jo højre jo bedre men os langtsomer. Højeste 31 men 10 er godt sted 
  await new Admin({ username, password: hashedPassword }).save(); //Her opretter og saver vi den i mongoDB og hashedpassword er det lange falske Passeword
  console.log(`Admin "${username}" oprettet`);

  await mongoose.connection.close(); //Her afslutter den det så den ik bliver hængende 
}

seedAdmin();
