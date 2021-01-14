const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'tim-session',
  keys: ['key1', 'key2']
}))
app.set('views', 'views')
app.set('view engine', 'hbs')


const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.render('index', {
    name: req.user?.displayName
  })
})
app.get('/failed', (req, res) => res.send('You Failed to log in!'))


app.get('/good', isLoggedIn, (req, res) => {
  console.log(req.user)
  res.render('uspex', {name: req.user.displayName})

})


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))






// Auth Telegram
// passport.use(
//   new TelegramPassport({
//       clientID: '123-456-789',
//       clientSecret: '1425986923:AAFHhKKvX06B5hjj3-i22SC2HFsvtV_WBOs',
//       callbackURL: 'https://www.example.net/auth/telegram/callback'
//   },
//   function(accessToken, refreshToken, profile, done) {
//       User.findOrCreate({}, function (err, user) {
//           done(err, user);
//       });
//   }
// ));


// app.get('/auth/telegram', 
//     passport.authenticate('telegram'),
//     function(req, res) {
//         // The request will be redirected to telepass.me for authentication,
//         // so this function will not be called.
//     }
// );

// app.get('/auth/telegram/callback', 
//     passport.authenticate('telegram', { failureRedirect: '/login' }),
//     function(req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     }
// );




// Auth Instagram
// passport.use(new InstagramPassport({
//   clientID: '439244973930208',
//   clientSecret: '41272aeb6d2658e30ac348bffa2dedfd',
//   callbackURL: "http://localhost:3000/auth/instagram/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.find({ instagramId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
// ));
// app.get('/auth/instagram',
//   passport.authenticate('instagram'));

// app.get('/auth/instagram/callback', 
//   passport.authenticate('instagram', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });
