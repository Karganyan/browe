const express = require('express');
const mongoose = require('mongoose');
const Coffee = require('../models/cofee');

mongoose.connect('process.env.DB_URL', { useNewUrlParser: true, useUnifiedTopology: true });

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
