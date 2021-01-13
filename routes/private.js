const express = require('express');
const authMiddleware = require('../middlewares/auth.js');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.render('MVP/private');
});

module.exports = router;
