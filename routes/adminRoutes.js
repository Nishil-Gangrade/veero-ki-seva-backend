const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET: List all pending events
router.get('/pending-events', adminController.getPendingEvents);

// POST: Approve event
router.post('/approve-event/:eventId', adminController.approveEvent);

// POST: Reject event
router.post('/reject-event/:eventId', adminController.rejectEvent);

module.exports = router;
