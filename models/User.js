const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: ""
  },
  donations: [
    {
      eventId: String,
      amount: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
