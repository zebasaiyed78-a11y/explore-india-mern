const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    state: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 4.5 },
    blurb: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    bestTime: { type: String, default: '' },
    explore: { type: [String], default: [] },
    image: { type: String, default: '' },
    gradient: { type: String, default: '#16324f,#2d6a4f' },
    budget: { type: String, default: '₹15,000 – ₹30,000' },
    duration: { type: String, default: '3–5 days' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
