const express = require('express');
const Admin = require('../model/admin');
const apiKeyAuth = require('../middleware/apiKeyAuth');
const router = express.Router();

// Admin Signup Route
router.post('/signup', apiKeyAuth, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create a new admin with default status and createdAt
    admin = new Admin({
      email,
      password
    });

    // Save the admin to the database
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Admin Login Route (for completeness)
router.post('/login', apiKeyAuth, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
