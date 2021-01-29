var router = require('express').Router();

// split up route handling
router.get('/all', require('./getAll'));

router.post('/add', require('./post'));

// etc.
module.exports = router;