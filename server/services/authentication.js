import User from "../models/UserModel";
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from "passport-jwt";

// Setup options for JwtStrategy
const jwtOptions = {
  // Get the secret from our environment
  secretOrKey: process.env.SECRET,
  // Tell our strategy where to find our token in the request
  jwtFromRequest: ExtractJwt.fromHeader("authorization")
};

// Create JWT strategy
// This will take our token and decode it to
// extract the information we have stored in it
export default new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.userId, function (err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


