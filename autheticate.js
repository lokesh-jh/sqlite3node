const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user");

passport.use(new LocalStrategy(
  {
    usernameField: 'username', // Customize this based on your form field names
    passwordField: 'password',
  },
  async (username, password, done) => {
    // Replace this with your own logic to authenticate the user
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
))
;

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
