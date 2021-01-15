const express = require('express');
const Bake = require('../models/bake');

const router = express.Router();

router.get('/', async (req, res) => {
  const bakes = await Bake.find({ visible: true });
  console.log(bakes);
  res.render('bakery/bakery', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
    bakes,
  });
});

router.get('/edit/:id', async (req, res) => {
  res.render('bakery/edit');
});

router.get('/new', async (req, res) => {
  res.render('bakery/new');
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const bake = await Bake.findById(req.params.id);
    bake.visible = false;
    await bake.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
