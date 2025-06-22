const express = require('express');
const { createDonation, getDonationsByEmail } = require('../controllers/donationController');

const router = express.Router();

router.post('/', createDonation);
router.get('/:email', getDonationsByEmail);

module.exports = router;
