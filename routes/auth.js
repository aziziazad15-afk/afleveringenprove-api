// routes/auth.js bruges til login 
import express from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

/* Det er den I kobler til en adresse i server.js med app.use("/api/auth", authRoutes) */
const router = express.Router(); 

// POST /api/auth/login
//Her siger vi async vi spørger om requst og respond, under spørger vi om username, password requst i body også under siger vi admin vent på at Admin.findOne username find en username. 
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  //Her siger vi if hvis ! omvendt admin || eller vent på bcrypt og compare den password og admin password og under returner respond 401 i json sprog forkert brugernavn eller adganskode
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ error: "Forkert brugernavn eller adgangskode" });
  }
  //gemmer login-info i sessionen og res.json sender den til front-end
  req.session.adminId = admin._id;
  res.json({ message: "Logget ind" });
});



// POST /api/auth/logout
// Her har vi logout vi spørger igen om req og res req.session = null lige meget ikke noget. Under res tilbage med besked Logget ud
router.post("/logout", (req, res) => {
  req.session = null;
  res.json({ message: "Logget ud" });
});


// GET /api/auth/me — bruges af admin-dashboard til at tjekke login-status
// Her ser vi om login-status igen req, res under har vi en if !req.session || eller !req.session.adminId ! siger hvis omvendt. Og under res.json({ adminId: req.session.adminId }); kommer den med den her besked
router.get("/me", (req, res) => {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ error: "Ikke logget ind" });
  }
  res.json({ adminId: req.session.adminId });
});

export default router;
