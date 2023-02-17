const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salutation: {
      type: String,
      enum: ['Mr', 'Mrs', 'Ms'],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
