import express from 'express';
import { createDonation, getDonationsByEmail } from '../controllers/donationController.js';

const router = express.Router();

router.post('/', createDonation);
router.get('/:email', getDonationsByEmail);

export default router;
