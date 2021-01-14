const express = require('express');
const bcrypt = require('bcrypt');

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
  res.render('signin', { isSignin: true }); // isSignin - включает скрипт public/signin.js
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
  res.render('signup', { isSignup: true }); // isSignup - включает скрипт public/signup.js
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
