const express = require('express');
const router = express.Router();

// TODO: search, get all, get by id
router.get('/', (req, res) => {
  res.json({ message: 'Destination routes working — build search & CRUD here' });
});

module.exports = router;
