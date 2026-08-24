// db.js
import mongoose from "mongoose";

const MONGO_URI = process.env.DB; // fx mongodb+srv://... (Atlas) — sat i .env

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default mongoose;
