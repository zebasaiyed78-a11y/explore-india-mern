const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    answers: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);
