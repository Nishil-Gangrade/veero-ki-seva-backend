
const Donation = require('../models/Donation.js');

const createDonation = async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json({ message: 'Donation saved successfully', donation: newDonation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save donation' });
  }
};

const getDonationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const donations = await Donation.find({ email }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donation history' });
  }
};

module.exports = { createDonation, getDonationsByEmail };
