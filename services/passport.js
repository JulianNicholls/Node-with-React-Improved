const passport        = require('passport');
const GoogleStrategy  = require('passport-google-oauth20').Strategy;
const mongoose        = require('mongoose');

const keys            = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:     keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:  '/auth/google/callback',    // Putting in a full address
    proxy:        true                        // would work as well
  }, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id });

    if (existingUser) {
//      console.log(`Existing User: ${existingUser.googleID}`);
      return done(null, existingUser);
    }

//    console.log(`New User: ${profile.id}`);

    const newUser = await new User({ googleID: profile.id }).save()

    done(null, newUser);
  })
);
