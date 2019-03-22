var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/model-users");

module.exports = function(server, users) {
  server.use(
    session({
      secret: "typingLogin",
      proxy: true,
      resave: true,
      saveUninitialized: true
    })
  );
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(
    new LocalStrategy(function(username, password, next) {
      // var user = users.find((user) => {
      //     return user.username === username && user.password === password;
      // })
      User.findOne({ username: username, password: password }, (err, user) => {
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      });

      // if (user) {
      //     next(null, user);
      // } else {
      //     next(null, false);
      // }
    })
  );

  passport.serializeUser(function(user, next) {
    next(null, user.email);
  });

  passport.deserializeUser(function(email, next) {
    User.findById({ email }, user => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });

    // next(null, user);
  });
};
