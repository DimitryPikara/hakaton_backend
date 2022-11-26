const express = require('express');

const verifyToken = require('../../middlewares/verifyToken');

const {
  createGroup,
  deleteGroup,
  deleteUser,
  addUser,
} = require('./groups.controller');

const router = express.Router();

router.get('/', verifyToken);

router.post('/add-user/:id', addUser);

router.post('/create', createGroup);

router.delete('/:id', deleteGroup);

router.delete('/delete-user/:id', deleteUser);

module.exports = router;
