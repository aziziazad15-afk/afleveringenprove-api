// form for et menupunkt (name, img, description
import mongoose from "../db.js";

const contentItemSchema = new mongoose.Schema(
  {
    headline: { type: String, default: "" },
    text: { type: String, required: true },
  },
  { _id: false }
);

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: {
      paragraph: { type: String, required: true },
      content: [contentItemSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
