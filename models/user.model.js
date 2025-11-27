// models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    },
    phone: {
      type: String,
      required: true,
    },
    hash_password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    profile: { type: String, default: null },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function () {
  if (!this.isModified('hash_password')) return;
  this.hash_password = await bcrypt.hash(this.hash_password, 10);
});

//compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.hash_password);
};

module.exports = mongoose.model('User', userSchema);
