const mongoose = require('mongoose');

const spouseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
});

module.exports = mongoose.model('Spouse', spouseSchema);