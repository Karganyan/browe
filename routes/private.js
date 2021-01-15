const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const User = require('../models/user')

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const userId = req.session.user.id
  console.log(userId);

  const test = [{
    title: 'Название',
    theme: 'Тема',
    desctription: 'Описание',
    descriptionDate: 'Дата мероприятия?',
    imgURL: { type: String, default: 'There is no picture' },
    visible: { type: Boolean, default: true },
    urlChat: 't.me/Vikt0rFrost',
  },{
    title: 'Название',
    theme: 'Тема',
    desctription: 'Описание',
    descriptionDate: 'Дата мероприятия?',
    imgURL: { type: String, default: 'There is no picture' },
    visible: { type: Boolean, default: true },
    urlChat: 't.me/Vikt0rFrost',
  },
  {
    title: 'Название',
    theme: 'Тема',
    desctription: 'Описание',
    descriptionDate: 'Дата мероприятия?',
    imgURL: { type: String, default: 'There is no picture' },
    visible: { type: Boolean, default: true },
    urlChat: 't.me/Vikt0rFrost',
  },
  {
    title: 'Название',
    theme: 'Тема',
    desctription: 'Описание',
    descriptionDate: 'Дата мероприятия?',
    imgURL: { type: String, default: 'There is no picture' },
    visible: { type: Boolean, default: true },
    urlChat: 't.me/Vikt0rFrost',
  }]

  const user = await User.findOne({ _id: userId })
  const userEvents = user.events
  
  // Не сортируем
  // userEvents.sort(function(a, b) {
  //   return b.createdAt - a.createdAt;
  // })

  // Отправить массив событий после сортировки
  res.render('private');
});

module.exports = router;
