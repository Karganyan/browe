const express = require('express');
const Bake = require('../models/bake');

const router = express.Router();

router.get('/', async (req, res) => {
  const bakes = await Bake.find({ visible: true });
  console.log(bakes);
  res.render('bakery', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
    bakes,
  });
});

module.exports = router;
