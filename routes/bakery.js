const express = require('express');

const router = express.Router();

// страница с меню пекарни
// ! добавить базу
router.get('/', (req, res) => {
  res.render('MVP/bakery');
});

module.exports = router;
