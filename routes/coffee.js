const express = require('express');
const Coffee = require('../models/cofee');

const router = express.Router();

router.get('/', async (req, res) => {
  const coffes = await Coffee.find({ visible: true });
  res.render('coffee/coffee', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
    coffes,
  });
});

router.get('/edit/:id', async (req, res) => {
  res.render('coffee/edit');
});

router.get('/new', async (req, res) => {
  res.render('coffee/new');
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);
    coffee.visible = false;
    await coffee.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
