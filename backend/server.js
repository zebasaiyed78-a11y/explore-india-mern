require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Item = require('./models/Item');
const Itinerary = require('./models/Itinerary');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Inquiry = require('./models/Inquiry');
const itemRoutes = require('./routes/items');
const { router: authRoutes, publicUser, secret } = require('./routes/auth');

const app = express();
const PORT = Number(process.env.PORT || 5000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/explore_india';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

const optionalAuth = (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (header.startsWith('Bearer ')) req.uid = jwt.verify(header.slice(7), secret()).id;
  } catch (_) {}
  next();
};

const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ error: 'Please log in to continue.' });
    req.uid = jwt.verify(header.slice(7), secret()).id;
    next();
  } catch (_) {
    res.status(401).json({ error: 'Your session has expired. Please log in again.' });
  }
};

app.get('/api/health', (_req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({ ok: true, db: states[mongoose.connection.readyState], service: 'Explore India API' });
});

app.use('/api/items', itemRoutes);
app.use('/api/destinations', itemRoutes); // friendly alias for the same CRUD resource
app.use('/api/auth', authRoutes);

app.get('/api/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(publicUser(user));
  } catch (error) {
    res.status(500).json({ error: 'Unable to load profile.' });
  }
});

app.post('/api/favorites/:slug', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    const slug = req.params.slug;
    const index = user.favorites.indexOf(slug);
    if (index === -1) user.favorites.push(slug);
    else user.favorites.splice(index, 1);
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Unable to update favourites.' });
  }
});

app.get('/api/itineraries', async (_req, res) => {
  try {
    res.json(await Itinerary.find().sort({ days: 1, price: 1 }));
  } catch (error) {
    res.status(500).json({ error: 'Unable to load itineraries.' });
  }
});

app.post('/api/plans', optionalAuth, async (req, res) => {
  try {
    const plan = await Plan.create({ user: req.uid || null, answers: req.body || {} });
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: 'Unable to save your trip plan.' });
  }
});

app.get('/api/plans', requireAuth, async (req, res) => {
  try {
    res.json(await Plan.find({ user: req.uid }).sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ error: 'Unable to load saved plans.' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body || {};
    if (!name || !message) return res.status(400).json({ error: 'Name and message are required.' });
    const inquiry = await Inquiry.create({ name, phone, email, message });
    res.status(201).json({ message: 'Thanks! Our tourism agent will contact you soon.', inquiry });
  } catch (error) {
    res.status(400).json({ error: 'Unable to send the enquiry.' });
  }
});

// Serve the built React app when available, while development uses Vite on port 5173.
const clientDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (error) => {
    if (error) res.status(404).send('Frontend is not built yet. Run npm run build inside frontend.');
  });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✓ MongoDB connected');
    app.listen(PORT, () => console.log(`✓ Backend running at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('✗ MongoDB connection failed:', error.message);
    console.error('Check backend/.env and make sure MongoDB is running.');
    process.exit(1);
  });
