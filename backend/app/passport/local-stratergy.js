const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

exports.LocalStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async function (req, username, password, done) {
    //check for username can be mobile or email
    let query = {
      $or: [
        { mobile: { $elemMatch: { phoneNumber: `${username}` } } },
        { email: `${username}` },
      ],
    };

    let user = await User.findOne(query);
    if (!user) {
      return done({message:"Invalid Username"}, false);
    } else {
      //if user is present authenticate using passport authenticate
      return user
        .authenticate(password)
        .then((a) => {
          if (a.error) {
            return Promise.reject({ message: a.error.message });
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log(err);
          return done({ message: err.error ? err.error.message : err.message}, false);
        });
    }
  }
);
