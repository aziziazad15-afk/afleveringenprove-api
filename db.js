// forbinder til MongoDB. Bliver kørt (importeret) af server.js, med det samme serveren starter.
import mongoose from "mongoose"; //Her imporer vi mongoose 

const MONGO_URI = process.env.DB; // ved ikke helt

mongoose
  .connect(MONGO_URI) // connect starter opgaven at oprette forbindelse over internettet og den sprøger om .then eller .catch
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default mongoose;
