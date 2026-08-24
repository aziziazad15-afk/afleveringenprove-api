// models/Admin.js
import mongoose from "../db.js";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed med bcrypt, aldrig plaintext
});

export default mongoose.model("Admin", adminSchema);
