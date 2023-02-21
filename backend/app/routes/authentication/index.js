const express = require('express');
const router = express.Router();

//all authentication routes
router.use('/', require(`./authentication.routes`));
router.use('/', require(`./profile.routes`));


module.exports = router;