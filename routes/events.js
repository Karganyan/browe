const express = require('express');
const Event = require('../models/event');
const User = require('../models/user');

const auth = require('../middlewares/auth');

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
router.post('/signup', auth, async (req, res) => {
  const { userid, eventid } = req.body;
  console.log(userid, eventid);
  const event = await Event.findById(eventid);
  const user = await User.findById(userid);
  console.log(event);
  user.events.push(event);
  await User.findByIdAndUpdate({ _id: userid }, { events: user.events });
  res.redirect('/events');
});

module.exports = router;
