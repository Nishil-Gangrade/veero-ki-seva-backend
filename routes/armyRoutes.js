const express = require('express');
const router = express.Router();
const armyController = require('../controllers/armyController');

// POST: Submit new event
router.post('/submit-event', armyController.submitArmyEvent);

// GET: Army family's own events
router.get('/my-events/:armyId', armyController.getMyEvents);

// GET: Approved events for donor
router.get('/approved-events', armyController.getApprovedEvents);


module.exports = router;
