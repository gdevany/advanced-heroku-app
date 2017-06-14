import User from "../models/UserModel";
import bcrypt from "bcrypt-nodejs";
import jwt from "jwt-simple";

export function signIn(req, res) {
  
  console.log("logged in now");
  res.json({ token: tokenForUser(req.user)});
}
export function signUp(req, res, next) {
  const { username, password } = req.body;
  let u = username;
  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422)
      .json({ error: "You must provide an username and password" });
  }
  console.log("Look for a user with the username");
  User.findOne({ username:u}).exec()
  .then((existingUser) => {
    // If the user exist return an error on sign up
    if (existingUser) {
      console.log("This username is already being used");
      return res.status(422).json({ error: "Username is in use" });
    }
    console.log("This username is free to use");
    saveUser(username,password,res,next);
  })
  .catch(err => next(err));
}
function saveUser(username,password,res,next) {
  // User bcrypt to has their password, remember, we never save plain text passwords!
  bcrypt.genSalt(10, function (err, salt) {
    console.log("the salt",salt);
    bcrypt.hash(password, salt, null, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      // Create a new user with the supplied username, and the hashed password
      const user = new User({ username, password: hashedPassword });
      console.log("Saving the user");
      user.save()
         .then(u => {
           console.log("User has been saved to database");
           res.json({ token: tokenForUser(u) });
         });
    });
  });
}
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

