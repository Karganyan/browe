const express = require('express');

const router = express.Router();

// страница с кофе
// ! добавить базу
router.get('/', (req, res) => {
  res.render('MVP/coffee');
});

module.exports = router;
