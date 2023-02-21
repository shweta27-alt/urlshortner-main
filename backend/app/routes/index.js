const AuthenticationRouter = require('./authentication');
const UrlRouter = require('./url');
const { sessionMW, passport, sessionLoginLogout } = require('../middlewares');
const { passportInitMW, passportSessionMW } = passport;


module.exports = (app) => {
    app.use(
        `/authentication`,
        [
            sessionMW,
            passportInitMW,
            passportSessionMW,
            sessionLoginLogout,
        ],
        AuthenticationRouter
    );
    app.use(
        `/`,
        [
            sessionMW,
            passportInitMW,
            passportSessionMW,
            sessionLoginLogout,
        ],
        UrlRouter 
    );
};