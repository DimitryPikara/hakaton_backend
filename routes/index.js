const express = require('express');

const router = express.Router();

const usersRouter = require('./Users/users');

router.use('/users', usersRouter);

module.exports = router;
