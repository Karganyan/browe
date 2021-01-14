const express = require('express');

const router = express.Router();

// перенаправляет на страницу с кофе
router.get('/', (req, res) => {
  res.redirect('/coffee');
});

// страница "о нас"
router.get('/about', (req, res) => {
  res.render('about');
});

// страница "контакты"
router.get('/contacts', (req, res) => {
  res.render('contacts');
});

router.get('/uspex', (req,res) => {
  res.render('uspex')
})

module.exports = router;
