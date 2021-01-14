const express = require('express');
const bcrypt = require('bcrypt');

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
    id: user.id,
    username: user.username, // ! username в зависимости от базы
  };
}

// авторизация
router.get('/signin', (req, res) => {
  res.render('MVP/signin', { isSignin: true }); // isSignin - включает скрипт public/signin.js
});

// авторизация
// ! добавить mongoose.model
/* router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Пытаемся сначала найти пользователя в БД
    const user = await User.findOne({
      username,
    }).exec();
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
}); */


// регистрация
router.get('/signup', (req, res) => {
  res.render('MVP/signup', { isSignup: true, layout: false }); // isSignup - включает скрипт public/signup.js
});

// регистрация
// ! добавить mongoose.model
// router.post('/signup', async (req, res) => {
//   const { username, password, email } = req.body;
//   try {
//     // Мы не храним пароль в БД, только его хэш
//     const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
//     console.log('saltRounds', saltRounds);
//     console.log('password', password);
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       email,
//     });
//     req.session.user = serializeUser(user);
//   } catch (err) {
//     logger.error(err);
//     return failAuth(res);
//   }
//   return res.end();
// });

// Авторизация через Гугл
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '809063709537-lmecqj5l72ktd9h6jta4llgho5n2h878.apps.googleusercontent.com',
    clientSecret: 'VLqMRvXWmqtHZs3tMIh9ASN0',
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

router.get('/failed', (req, res) => {
  res.send('You Failed to log in!')
})
router.get('/good', isLoggedIn, (req, res) => {
  res.render('coffee', { name: req.user.displayName })

})
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/auth/good');
  }
);


// Выход
router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
});

module.exports = router;
