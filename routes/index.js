const express = require('express');

const router = express.Router();

const usersRouter = require('./Users/users');
const lectureRouter = require('./Lectures/lectures');
const groupsRouter = require('./Groups/groups');

router.use('/users', usersRouter);
router.use('/lecture', lectureRouter);
router.use('/groups', groupsRouter);

module.exports = router;
