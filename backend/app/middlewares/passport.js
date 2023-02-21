const passport = require('../passport');

module.exports.passportInitMW = passport.initialize();
module.exports.passportSessionMW = passport.session();