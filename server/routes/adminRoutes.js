const express = require('express');
const router = express.Router();
const {
  getAllTickets,
  updateTicketStatus,
  getTicketStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here are protected and restricted to admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/tickets', getAllTickets);
router.put('/tickets/:id', updateTicketStatus);
router.get('/stats', getTicketStats);

module.exports = router;