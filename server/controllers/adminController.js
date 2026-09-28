const Ticket = require('../models/Ticket');

// @desc    Get all tickets with filters & search
// @route   GET /api/admin/tickets
// @access  Private/Admin
const getAllTickets = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const tickets = await Ticket.find(query)
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update any ticket status
// @route   PUT /api/admin/tickets/:id
// @access  Private/Admin
const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Please provide a status to update' });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get ticket statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getTicketStats = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const open = await Ticket.countDocuments({ status: 'Open' });
    const inProgress = await Ticket.countDocuments({ status: 'In Progress' });
    const resolved = await Ticket.countDocuments({ status: 'Resolved' });

    res.status(200).json({
      success: true,
      data: {
        total,
        open,
        inProgress,
        resolved
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getAllTickets, updateTicketStatus, getTicketStats };