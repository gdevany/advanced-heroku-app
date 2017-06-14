import bcrypt from "bcrypt-nodejs";
import User from "../models/UserModel";
import LocalStrategy from "passport-local";

export default new LocalStrategy(function (username, password, done) {
  console.log("Looking for a user with the username",username);
  User.findOne({ username: username }).exec()
  .then(user => {
    // If there is no user found call done with a `null` argument, signifying no error
    // and `false` signifying that the signin failed
    if (!user) {
      console.log("No user found with this username",username);
      return done(null, false);
    }

    bcrypt.compare(password, user.password, function (err, isMatch) {
      // If there is an error call done with our error
      if (err) {
        return done(err, false);
      }

      // If the passwords do not match call done with a `null` argument, signifying no error
      // and `false` signifying that the signin failed
      if (!isMatch) {
        return done(null, false);
      }
      console.log("The username was found and the passwords matched",username);
      // If we have no errors and the passwords match
      // call done with a `null` argument, signifying no error
      // and with the now signed in user
      return done(null, user);
    });
  })
  .catch(err => done(err, false));
});


