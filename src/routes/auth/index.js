var router = require('express').Router();


//LOGIN
router.post('/login', require('./login'));


//FORGOT-PASSWORD 
//router.post('/forgot-password', require('./forgot-password'));

//REGISTER
router.post('/register', require('./register'))

module.exports = router;