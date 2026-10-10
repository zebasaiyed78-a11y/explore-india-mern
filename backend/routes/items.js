const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/items - Read all items with optional search/filter/sort
router.get('/', async (req, res) => {
  try {
    const { q, state, category, sort = 'featured' } = req.query;
    const filter = {};

    if (q) {
      const regex = new RegExp(escapeRegex(q), 'i');
      filter.$or = [{ name: regex }, { state: regex }, { blurb: regex }, { category: regex }];
    }
    if (state && state !== 'All') filter.state = state;
    if (category && category !== 'All') filter.category = category;

    let query = Item.find(filter);
    if (sort === 'rating') query = query.sort({ rating: -1, name: 1 });
    else if (sort === 'name') query = query.sort({ name: 1 });
    else if (sort === 'newest') query = query.sort({ createdAt: -1 });
    else query = query.sort({ rating: -1, name: 1 });

    const items = await query.exec();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load destinations.' });
  }
});

// GET /api/items/:id - Read one item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Destination not found.' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Invalid destination id.' });
  }
});

// POST /api/items - Create an item (included to demonstrate CRUD)
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/items/:id - Update an item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Destination not found.' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/items/:id - Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Destination not found.' });
    res.json({ message: 'Destination deleted.', item });
  } catch (error) {
    res.status(400).json({ error: 'Invalid destination id.' });
  }
});

module.exports = router;
