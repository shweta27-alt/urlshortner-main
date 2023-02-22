const express = require('express');
const router = express.Router();

//all authentication routes
router.use('/', require(`./authentication.routes`));


module.exports = router;