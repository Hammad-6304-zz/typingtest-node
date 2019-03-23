var passport = require('passport')
  var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/model-users')

passport.use(new FacebookStrategy({
    clientID: "267832430794661",
    clientSecret: "4532ae7170c0025c18430f3e4e3f41ef",
    callbackURL: "http://localhost:8000/fb/login"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebook: profile.id }, function(err, user) {
      if (err) { return done(err,false); }
      if (!user) {
        const user = new User({ facebook: profile.id });
        user.username = profile.emails[0].value||profile.id
        user.firstname = profile.name.givenName;
        user.lastname = profile.name.familyName;
        user.img = profile.photos[0].value
        user.save((err, user) => {
            if (err) return done(err, false);
            done(null, user);
        })
        return;
    }
      done(null, user);
    });
  }
));