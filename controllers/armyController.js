const ArmyEvent = require('../models/ArmyEvent');

// Submit Army Event
const submitArmyEvent = async (req, res) => {
  try {
    const { title, description, date, armyId, category} = req.body;

    const newEvent = new ArmyEvent({
      title,
      description,
      date,
      armyId,
      category
    });

    await newEvent.save();

    console.log('Army Event submitted:', newEvent);

    return res.status(200).json({ message: 'Army event submitted successfully!', event: newEvent });
  } catch (error) {
    console.error('Error in submitArmyEvent:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Get My Events
const getMyEvents = async (req, res) => {
  try {
    const events = await ArmyEvent.find({ armyId: req.params.armyId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching my events', error });
  }
};

// Admin: Get All Army Events
const getAllArmyEvents = async (req, res) => {
  try {
    const events = await ArmyEvent.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all army events', error });
  }
};

// Admin: Update Event Status
const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedEvent = await ArmyEvent.findByIdAndUpdate(
      req.params.eventId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};
// Get Approved Events for Donor
const getApprovedEvents = async (req, res) => {
  try {
    const approvedEvents = await ArmyEvent.find({ status: 'Approved' }).populate('armyId', 'name email');
    res.status(200).json(approvedEvents);
  } catch (error) {
    console.error('Error fetching approved events:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  submitArmyEvent,
  getMyEvents,
  getAllArmyEvents,
  updateEventStatus,
  getApprovedEvents 
};
