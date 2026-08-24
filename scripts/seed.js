// scripts/seed.js — indlæser data/menuItems.json i MongoDB
import "dotenv/config";
import mongoose from "../db.js";
import MenuItem from "../models/MenuItem.js";
import menuItems from "../data/menuItems.json" with { type: "json" };

async function seed() {
  await MenuItem.deleteMany({});

  const docs = menuItems.map(({ name, img, description }) => ({
    name,
    img,
    description,
  }));

  await MenuItem.insertMany(docs);
  console.log(`Indsatte ${docs.length} menupunkter`);

  await mongoose.connection.close();
}

seed();
