// routes/menu.js
import express from "express";
import MenuItem from "../models/MenuItem.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// GET /api/menu — alle menupunkter
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Kunne ikke hente menupunkter" });
  }
});

// GET /api/menu/:id — ét menupunkt
router.get("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Menupunkt ikke fundet" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Kunne ikke hente menupunkt" });
  }
});

// POST /api/menu — opret nyt menupunkt (kræver login)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, img, description } = req.body;
    const newItem = new MenuItem({ name, img, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Kunne ikke oprette menupunkt" });
  }
});

// PUT /api/menu/:id — opdater menupunkt (kræver login)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { name, img, description } = req.body;
    const updated = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, img, description },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Menupunkt ikke fundet" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Kunne ikke opdatere menupunkt" });
  }
});

// DELETE /api/menu/:id — slet menupunkt (kræver login)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Menupunkt ikke fundet" });
    }
    res.json({ message: "Menupunkt slettet" });
  } catch (error) {
    res.status(500).json({ error: "Kunne ikke slette menupunkt" });
  }
});

export default router;
