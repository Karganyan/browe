const express = require('express');
const Coffee = require('../models/cofee');

const router = express.Router();

router.get('/', async (req, res) => {
  const coffes = await Coffee.find({ visible: true });
  res.render('coffee', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
    coffes,
  });
});

module.exports = router;
