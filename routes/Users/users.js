const express = require('express');
const { getUsers, getOneUser } = require('./users.controller');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getOneUser);

module.exports = router;
