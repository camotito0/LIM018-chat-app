/* eslint-disable */
const router = require('express').Router();

/* controllers */
const auth = require('../controllers/auth.controller');
const user = require('../controllers/user.controller');

/* middleware auth */
const {authenticationToken} = require('../utils');

/* routes */

router.post('/auth/register', auth.registerUser);
router.post('/auth/login', auth.loginUser);

router.get('/users', authenticationToken, user.getUsers)


module.exports = router;