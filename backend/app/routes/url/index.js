const express = require('express');
const router = express.Router();

router.use('/', require(`./url.routes`));


module.exports = router;