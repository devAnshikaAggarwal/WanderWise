const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// TODO: create budget, add expense, get totals
router.get('/', protect, (req, res) => {
  res.json({ message: 'Budget routes working — build CRUD here' });
});

module.exports = router;
