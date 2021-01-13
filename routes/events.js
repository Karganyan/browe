const express = require('express');

const router = express.Router();

// страница с мероприятиями
// ! добавить базу
router.get('/', (req, res) => {
  res.render('MVP/events');
});

// записаться
// ! написать fetch и переделать на patch // должна меняться на отписаться
router.post('/signup/:id', (req, res) => {
  res.redirect('/events');
});

module.exports = router;
