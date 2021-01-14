const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/uspex', (req,res) => {
  res.render('uspex')
})

module.exports = router;
