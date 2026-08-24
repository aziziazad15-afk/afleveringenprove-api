// routes/contact.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact — gem en henvendelse fra kontakt-modalen
router.post("/", async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const contact = new Contact({ name, email, comment });
    await contact.save();
    res.status(201).json({ message: "Tak for din henvendelse" });
  } catch (error) {
    res.status(400).json({ error: "Kunne ikke gemme henvendelsen" });
  }
});

export default router;
