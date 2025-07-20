const mongoose = require('mongoose');

const armyEventSchema = new mongoose.Schema({
  armyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Birthday', 'Marriage', 'Hospital', 'School']
  },
  description: String,
  date: Date,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  image: String, // optional field if we want image later
}, { timestamps: true });

module.exports = mongoose.model('ArmyEvent', armyEventSchema);
