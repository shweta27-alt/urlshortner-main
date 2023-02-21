//login middleware to login user
const login = (req, res) => {
    let getLogIn = req.logIn;
    return async (user, done) => {
        if (req.isAuthenticated()) {
            return done();
        }
        getLogIn.call(req, user, async () => {
            done();
        });
    };
};

//logout middleware to logout user
const logout = (req, res) => {
    let getLogOut = req.logOut;
    return async () => {
        await new Promise((resolve, reject) => {
            getLogOut.call(req, async function (err) {
                if (err) {
                    return reject(err);
                }
                try {
                    //destroy user session
                    req.session.destroy((err) => {
                        if (err) {
                            return reject(err);
                        }
                        //clear user cookie
                        res.clearCookie('c.session', {
                            // secure: 'auto',
                              path:'/',
                            //   sameSite: 'none',
                              domain: `localhost`,
                            expires: new Date(
                                Date.now() - 100000
                            ).toISOString(),
                            maxAge: 0,
                        });
                        res.set({ logout: '1' });
                        return resolve();
                    });
                } catch (err) {
                    return reject(err);
                }
            });
        });
    };
};

exports.middleware = function logInMethods(req, res, next) {
    req.login  = login(req, res);
    req.logout = logout(req, res);
    next();
};
