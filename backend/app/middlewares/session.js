const session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/urlShortnerDb',
    collection: 'sessions'
});

//express session middleware
const sessionMW = async (req, res, next) => {
    let sessionMiddleware;
    const maxAge = 30000000; //max age of user session
    sessionMiddleware = session({
        name: 'c.session',
        secret: 'c.secret',
        store: store, // mongo db as session storage 
        resave: true,
        proxy: true,
        rolling: true,   //roll the session from current date to maxage
        saveUninitialized: false,
        cookie: {
            // secure: 'auto',
            path: '/',
            // sameSite: 'none',
            maxAge,
            domain: `localhost`,
        },
    });

    sessionMiddleware(req, res, next);
};

module.exports = sessionMW;
