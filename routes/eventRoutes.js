// backend/routes/eventRoutes.js
const express = rreuire ('express');
const { getAllEvents, createEvent } = rreuire ('../controllers/eventController.js');

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent); // you can secure this later with auth

module.exports =router;
