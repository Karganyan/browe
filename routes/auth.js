const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const logger = console;
const router = express.Router();

// Завершает запрос с ошибкой аутентификации
function failAuth(res) {
  return res.status(401).end();
}

// Подготавливает пользователя для записи в сессию
function serializeUser(user) {
  return {
    id: user?.id,
    login: user.login,
  };
}

// авторизация
router.get('/signin', (req, res) => {
  res.render('signin', { isSignin: true }); // isSignin - включает скрипт public/signin.js
});

// авторизация
router.post('/signin', async (req, res) => {
  const {
    login,
    password,
  } = req.body;
  try {
    // Пытаемся сначала найти пользователя в БД
    const user = await User.findOne({ login });
    if (!user) {
      return failAuth(res);
    }
    // Сравниваем хэш в БД с хэшем введённого пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return failAuth(res);
    }
    req.session.user = serializeUser(user);
  } catch (err) {
    logger.error(err);
    return failAuth(res);
  }
  return res.end();
});

// регистрация
router.get('/signup', (req, res) => {
  res.render('signup', { isSignup: true }); // isSignup - включает скрипт public/signup.js
});

// регистрация
router.post('/signup', async (req, res) => {
  const {
    name,
    login,
    password,
    email,
    phoneNumber,
  } = req.body;
  console.log('----------->', name,
    login,
    password,
    email,
    phoneNumber);
  try {
    // Мы не храним пароль в БД, только его хэш
    const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      login,
      name,
      password: hashedPassword,
      email,
      phoneNumber,
    });
    console.log(user);
    req.session.user = serializeUser(user);
  } catch (err) {
    logger.error(err);
    return failAuth(res);
  }
  return res.end();
});

// Авторизация через Гугл
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '809063709537-lmecqj5l72ktd9h6jta4llgho5n2h878.apps.googleusercontent.com',
  clientSecret: 'VLqMRvXWmqtHZs3tMIh9ASN0',
  callbackURL: "http://localhost:3000/auth/google/callback",
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get('/failed', (req, res) => {
  res.send('You Failed to log in!')
})
router.get('/good', isLoggedIn, async (req, res) => {
  const name = req.user.displayName
  const email = req.user.emails[0].value
  const user = await User.findOne({ email })
  console.log('DO IFA', user);
  if (!user) {
    function generateRandom() {
      let alphabet = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
      let random = '';
      for (let i = 0; i < 9; i++) {
        random += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
      }
      return random
    }
    const login = name;
    const password = generateRandom()

    const newUser = await new User({ name, login, password, email })
    newUser.save()
    console.log('DO USERA', user);
    req.session.user = serializeUser(newUser);
    res.redirect('/');
  } else {
    req.session.user = serializeUser(user);
    res.redirect('/');
  }
})
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),


  function (req, res) {
    res.redirect('/auth/good');
  });

// Выход
router.get('/signout', (req, res, next) => {
  console.log('------->', req.session.user);
  req.session = null;
  res.clearCookie();
  res.redirect('/');
});

module.exports = router;
