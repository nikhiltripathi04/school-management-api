// index.js
const express = require('express');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api', schoolRoutes);

// Simple welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the School Management API! 🏫');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});