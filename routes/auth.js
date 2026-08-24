// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ error: "Forkert brugernavn eller adgangskode" });
  }

  req.session.adminId = admin._id;
  res.json({ message: "Logget ind" });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session = null;
  res.json({ message: "Logget ud" });
});

// GET /api/auth/me — bruges af admin-dashboard til at tjekke login-status
router.get("/me", (req, res) => {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ error: "Ikke logget ind" });
  }
  res.json({ adminId: req.session.adminId });
});

export default router;
