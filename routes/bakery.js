const express = require('express');

const router = express.Router();

// страница с меню пекарни
// ! добавить базу
router.get('/', (req, res) => {
  res.render('bakery');
});

module.exports = router;
