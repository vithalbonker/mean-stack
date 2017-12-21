const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt')﻿;
  opts.secretOrKey = config.secret;
  passport.use(new jwtStrategy(opts, (jwt_payload, done) =>{
    console.log(jwt_payload);
    User.getUserById(jwt_payload._doc._id, (err, user) =>{
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      }else{
        return done(null, false);
      }
    });
  }));
}
