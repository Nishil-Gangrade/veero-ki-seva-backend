const mongoose =require('mongoose');

const donationSchema = new mongoose.Schema({
  name: String,
  email: String,
  amount: Number,
  method: String,
  message: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports= mongoose.model('Donation', donationSchema);
