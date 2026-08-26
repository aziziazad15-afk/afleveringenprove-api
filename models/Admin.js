//  form for en admin-bruger (username, hashed password 
import mongoose from "../db.js"; //Her importer jeg mongoDB 

/* Her under siger jeg hvad min username og password skal have jeg ved ikke helt hvad Schema er forklar */
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed med bcrypt, aldrig plaintext
});

/* Her under exporter vi den men opbygningen er lidt svært at forstå forklar den her lidt mere */
export default mongoose.model("Admin", adminSchema); 

/* Denne kode er konektet til routes/auth.js  */
