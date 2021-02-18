const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const User = require('../models/user');
const Event = require('../models/event');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const { user } = req.session;
  const userEvents = await Promise.all(user.events.map((el) => Event.findById(el)));
  res.render('private', { userEvents });
});

router.get('/editProfile', async (req, res) => {
  const user = await User.findById(req.session.user.id);
  res.render('profile', { user, layout: false });
});

router.post('/', async (req, res) => {
  const userId = req.session.user.id;

  const { name, login, phoneNumber, email, password } = req.body;
  let update = { name, login, phoneNumber, email, password };
  let updateFiltered = Object.keys(update).reduce((acc, key) => {
    if (update[key].trim()) {
      acc[key] = update[key].trim();
    }
    return acc;
  }, {});

  await User.findOneAndUpdate({ _id: userId }, updateFiltered, { new: true });
  // console.log(user)
  return res.redirect('/private');
});
module.exports = router;
