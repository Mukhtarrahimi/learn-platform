const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      default: null,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);
