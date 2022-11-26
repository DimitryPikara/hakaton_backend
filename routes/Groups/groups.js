const express = require('express');

const {
  createGroup,
  selectGroupForUser,
  getGroups,
} = require('./groups.controller');

const router = express.Router();

router.get('/', getGroups);

router.post('/create', createGroup);

router.patch('/:id', selectGroupForUser)

module.exports = router;
