const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const secret = () => process.env.JWT_SECRET || 'dev-secret';

const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, favorites: user.favorites });
const issueToken = (user) => jwt.sign({ id: user._id.toString() }, secret(), { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must contain at least 6 characters.' });

    const normalizedEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ error: 'An account with this email already exists.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashed });
    res.status(201).json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create your account.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email: (email || '').trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    res.json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ error: 'Unable to log you in.' });
  }
});

module.exports = { router, publicUser, issueToken, secret };
