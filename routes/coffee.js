const express = require('express');

const router = express.Router();

// страница с кофе
// ! добавить базу
router.get('/', (req, res) => {
  res.render('coffee', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
  });
});

module.exports = router;
