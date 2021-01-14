const express = require('express');
const Coffee = require('../models/cofee');

const router = express.Router();

// страница с кофе
// ! добавить базу
router.get('/', async (req, res) => {
  const coffes = await Coffee.find();
  console.log(coffes);
  res.render('coffee', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
  });
});

module.exports = router;
