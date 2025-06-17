const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // for .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parses incoming JSON
app.use('/uploads', express.static('uploads'));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Now your signup route is at /api/auth/signup
const verifyToken = require("./middleware/authMiddleware");
const donationRoutes =require('./routes/donationRoutes.js');
app.use('/api/donations', donationRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Protected Route Example
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const User = require("./models/User");
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
