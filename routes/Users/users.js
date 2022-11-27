const express = require('express');
const { getUsers, getOneUser, getUserByLectureId, createUser } = require('./users.controller');
const { Users, ApiTokens } = require('../../models');
const resGenerator = require('../../utils/resGenerator');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getOneUser);

router.get('/user-lectures/:id', getUserByLectureId);

router.delete('/delete/all/lol', async (req, res) => {
  await Users.truncate();
  await ApiTokens.truncate();
  resGenerator(res, 200, { message: "DELETED" });
});

router.post('/create/mock', createUser);

module.exports = router;
