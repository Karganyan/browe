require('dotenv').config();
const hbs = require('hbs');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
require('./passport-setup');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

// Авторизация Passport
const passport = require('passport');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const userMiddleware = require('./middlewares/user.js');

// const InstagramPassport = require('passport-instagram').Strategy   Больше не работает
// const TelegramPassport = require('passport-telegram').Strategy     Не работает без протокола https
require('./passport-setup');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coffeeRouter = require('./routes/coffee');
const eventsRouter = require('./routes/events');
const bakeryRouter = require('./routes/bakery');
const authRouter = require('./routes/auth');
const privateRouter = require('./routes/private');
const adminRouter = require('./routes/admin');
const { truncate } = require('fs');

const app = express();

app.use(cookieSession({
  name: 'tim-session',
  keys: ['key1', 'key2'],
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Доверять первому прокси (для Heroku и прочих)
app.set('trust proxy', 1);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
}));
app.use(userMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coffee', coffeeRouter);
app.use('/events', eventsRouter);
app.use('/bakery', bakeryRouter);
app.use('/auth', authRouter);
app.use('/private', privateRouter);
app.use('/admin', adminRouter);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
