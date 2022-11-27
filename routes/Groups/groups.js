const express = require('express');

const checkWifi = require('../../middlewares/checkWifiName');

const {
  createGroup,
  selectGroupForUser,
  getGroups,
} = require('./groups.controller');

const router = express.Router();

router.get('/check-wifi', checkWifi, getGroups);

router.get('/', getGroups);

router.post('/create', createGroup);

router.patch('/:id', selectGroupForUser)

module.exports = router;
