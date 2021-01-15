const express = require('express');
const Event = require('../models/event');
const User = require('../models/user');

const auth = require('../middlewares/auth');

const router = express.Router();

// страница с мероприятиями
// ! добавить базу
router.get('/', async (req, res) => {
  const events = await Event.find({ visible: true });
  console.log('---->', res.locals.user);
  console.log('--->,');
  res.render('events', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
    events,
  });
});

router.post('/signup', auth, async (req, res) => {
  const { userid, eventid } = req.body;
  res.locals.user.events.push(eventid);
  const event = await Event.findById(eventid);
  const user = await User.findById(userid);
  user.events.push(event);
  await User.findByIdAndUpdate({ _id: userid }, { events: user.events });
  res.redirect('/events/events');
});

router.delete('/singout', auth, async (req, res) => {
  const { userid, eventid } = req.body;
  res.locals.user.events.push(eventid);
  const event = await Event.findById(eventid);
  const user = await User.findById(userid);
  user.events.push(event);
  await User.findByIdAndUpdate({ _id: userid }, { events: user.events });
  res.redirect('/events');
});

module.exports = router;
