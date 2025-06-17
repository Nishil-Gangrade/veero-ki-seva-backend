// backend/controllers/eventController.js
import Event from '../models/Event.js';

export const getAllEvents = async (req, res) => {
  const category = req.query.category;
  const filter = category ? { category } : {};

  try {
    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEvent = async (req, res) => {
  const { title, category, description, image } = req.body;

  try {
    const newEvent = new Event({ title, category, description, image });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
