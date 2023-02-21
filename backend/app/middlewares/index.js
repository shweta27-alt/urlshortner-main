const sessionMW = require('./session');
const { middleware } = require('./session_login_logout');
const passport = require('./passport');
const {checkAuthenticated} = require('./checkAuthenticated')

module.exports = {
    sessionMW,
    passport,
    sessionLoginLogout: middleware,
    checkAuthenticated
};
