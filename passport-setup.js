const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '1076868671217-4bsj8i7bsft5ou1qgq998dkuf3n0fvg3.apps.googleusercontent.com',
    clientSecret: 'pSTClGtw_nP4MgUElkEe_J1a',
    callbackURL: "http://localhost:3000/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));



