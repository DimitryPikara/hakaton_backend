const express = require('express');

const verifyToken = require('../../middlewares/verifyToken');

const {
  createUser,
  logout,
} = require('./auth.controller');

const router = express.Router();

router.post('/create', createUser);

router.post('/logout', verifyToken, logout)

module.exports = router;