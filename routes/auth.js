const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// ===== Multer Setup for Profile Picture Upload ===== //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, `profile_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// ========== SIGNUP ==========
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== LOGIN ==========
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePic: user.profilePic || '',
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ========== UPDATE PROFILE ==========
router.put(
  '/update-profile',
  verifyToken,
  upload.single('profilePic'), // Add this to accept file upload
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const { name, phone, password } = req.body;

      const updateFields = {};
      if (name) updateFields.name = name;
      if (phone) updateFields.phone = phone;
      if (password) {
        const hashed = await bcrypt.hash(password, 10);
        updateFields.password = hashed;
      }

      if (req.file) {
        updateFields.profilePic = req.file.filename;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true }
      ).select('-password');

      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
