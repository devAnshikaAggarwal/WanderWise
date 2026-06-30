const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// TODO: save, remove, get wishlist
router.get('/', protect, (req, res) => {
  res.json({ message: 'Wishlist routes working — build CRUD here' });
});

module.exports = router;
