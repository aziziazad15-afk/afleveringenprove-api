// seed.js — indlæser data/menuItems.json i MongoDB
//Samme tre som i seedAdmin.js: hent .env-værdier, forbind til databasen, og hent MenuItem-modellen (så vi kan snakke med menuitems-collectionen).
import "dotenv/config";
import mongoose from "../db.js";
import MenuItem from "../models/MenuItem.js";
import menuItems from "../data/menuItems.json" with { type: "json" }; //Henter selve rådataen — de fire alien-menupunkter — direkte fra JSON-filen og with { type: "json "} siger til Node det her er data ik læs det som kode

async function seed() {
  await MenuItem.deleteMany({}); //

  /* .map() looper over rådataen som havde før id filter 1 2 3 4 men nu kun name, img, description */
  const docs = menuItems.map(({ name, img, description }) => ({
    name,
    img,
    description,
  }));

  await MenuItem.insertMany(docs); /* indsætter alle dokumenterne i docs-listen på én gang (hurtigere end at gemme ét ad gangen */
  console.log(`Indsatte ${docs.length} menupunkter`);

  await mongoose.connection.close();
}

seed();
/* seed.js fylder menupunkter i, og seedAdmin.js opretter én login-bruger. */