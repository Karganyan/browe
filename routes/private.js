const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const User = require('../models/user')

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const userId = req.session.user.id
  console.log(userId);

  const user = await User.findOne({ _id: userId })
  const userEvents = user.events
  
  // Не сортируем
  // userEvents.sort(function(a, b) {
  //   return b.createdAt - a.createdAt;
  // })

  // Отправить массив событий после сортировки
  res.render('private', { userEvents });
});

router.get('/editProfile', (req,res) => {
  res.render('profile', {layout: false})
})

router.post('/', async (req,res) => {
  const userId = req.session.user.id
  
  const {name, login, phoneNumber, email, password} = req.body
  let update = {name, login, phoneNumber, email, password}
  let updateFiltered = Object.keys(update).reduce((acc, key) => {
    if (update[key].trim()) {
      acc[key] = update[key].trim()
    }
    return acc
  }, {})

  console.log(req.body)
  console.log(updateFiltered)

  const user = await User.findOneAndUpdate({ _id: userId }, updateFiltered, {new: true})
  // console.log(user)
  return res.redirect('/private')
})
module.exports = router;
