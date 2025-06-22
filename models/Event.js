// backend/models/Event.js
const mongoose =require('mongoose');

const eventSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Birthday', 'Marriage', 'Hospital', 'School']
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  image: String, // image URL or path
}, {
  timestamps: true
});

module.exports= mongoose.model('Event', eventSchema);
