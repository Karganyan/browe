const express = require('express');
const Event = require('../models/event');

const router = express.Router();

// страница с мероприятиями
// ! добавить базу
router.get('/', async (req, res) => {
  const events = await Event.find({ visible: true });
  res.render('events', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
    events,
  });
});

// записаться
// ! написать fetch и переделать на patch // должна меняться на отписаться
router.post('/signup/:id', (req, res) => {
  res.redirect('/events');
});

module.exports = router;
