const ArmyEvent = require('../models/ArmyEvent');

// Fetch all pending events for approval
exports.getPendingEvents = async (req, res) => {
  try {
    const pendingEvents = await ArmyEvent.find({ status: 'Pending' }).populate('armyId', 'name email');
    res.json(pendingEvents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending events' });
  }
};

// Approve event
exports.approveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await ArmyEvent.findByIdAndUpdate(eventId, { status: 'Approved' }, { new: true });
    res.json({ message: 'Event approved', event });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve event' });
  }
};

// Reject event
exports.rejectEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await ArmyEvent.findByIdAndUpdate(eventId, { status: 'Rejected' }, { new: true });
    res.json({ message: 'Event rejected', event });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject event' });
  }
};
