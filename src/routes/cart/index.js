var router = require('express').Router();

// split up route handling
router.get('/', require('./get'));

router.post('/add', require('./add'));

// etc.
module.exports = router;