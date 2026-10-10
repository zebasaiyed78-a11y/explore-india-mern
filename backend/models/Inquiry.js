const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    message: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
