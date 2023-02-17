const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  sports: [
    {
      type: String,
    },
  ],
  musicGenres: [
    {
      type: String,
    },
  ],
  movies: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Preferences', preferencesSchema);
