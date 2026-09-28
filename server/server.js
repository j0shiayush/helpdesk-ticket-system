const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Ensure this is imported
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware - MUST BE BEFORE ROUTES
app.use(cors({
    origin: 'http://localhost:5173', // Allow your React frontend
    credentials: true
}));
app.use(express.json());

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Test Route
app.get('/', (req, res) => {
  res.send('Helpdesk API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});