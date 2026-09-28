const Ticket = require('../models/Ticket');

// @desc    Create a support ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please provide title, description, and category' });
    }

    const ticket = await Ticket.create({
      user_id: req.user._id,
      title,
      description,
      category,
      priority: priority || 'Low',
      status: 'Open'
    });

    res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user's tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Ensure the user owns the ticket
    if (ticket.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to access this ticket' });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this ticket' });
    }

    ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this ticket' });
    }

    await ticket.deleteOne();

    res.status(200).json({ success: true, message: 'Ticket removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createTicket, getTickets, getTicket, updateTicket, deleteTicket };