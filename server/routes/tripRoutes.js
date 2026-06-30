const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// TODO: build full CRUD — create, get all, get one, update, delete
router.get('/', protect, (req, res) => {
  res.json({ message: 'Trip routes working — build CRUD here' });
});

module.exports = router;
