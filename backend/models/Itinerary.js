const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    days: { type: Number, required: true, min: 1 },
    tags: { type: [String], default: [] },
    includes: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Itinerary', itinerarySchema);
