/* eslint-disable */
const router = require('express').Router();

/* controllers */
const auth = require('../controllers/auth.controller');
const user = require('../controllers/user.controller');
const channel = require('../controllers/channels.controller');

/* middleware auth */
const {authenticationToken} = require('../utils');

/* routes */

router.post('/auth/register', auth.registerUser);
router.post('/auth/login', auth.loginUser);

router.put('/users/:id', authenticationToken, user.updateUser);
router.delete('/users/:id', authenticationToken, user.deleteUser);
router.get('/users', authenticationToken, user.getUsers);

router.post('/channel', authenticationToken, channel.createChannel);
router.put('/channels/:id', authenticationToken, channel.updateChannel);
router.delete('/channels/:id', authenticationToken, channel.deleteChannel);
router.get('/channelsByUser', authenticationToken, channel.getUserChannelsJoin);
router.get('/channels', authenticationToken, channel.getAllChannels);

module.exports = router;