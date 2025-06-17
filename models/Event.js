// backend/models/Event.js
import mongoose from 'mongoose';

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

export default mongoose.model('Event', eventSchema);
