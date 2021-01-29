var router = require('express').Router();
const { auth } = require('../config/auth');
//LOGIN , REGISTER, FORGOT PASSWORD
var authService = require('./../services/auth');

router.use('/auth', require('./auth'));
router.use('/cart', authService.authenticateJWT, require('./cart'));
router.use('/product', authService.authenticateJWT, require('./product'));


module.exports = router