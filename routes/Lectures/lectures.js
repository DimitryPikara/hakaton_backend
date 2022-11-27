const express = require('express');

const router = express.Router();

const {
  getLecturesByTeacher,
  createLecture,
  editLeacture,
  getLecturesByGroup,
} = require('./lectures.controller');

router.get('/teacher/:name', getLecturesByTeacher);

router.get('/student/:id', getLecturesByGroup)

router.post('/create', createLecture);

router.patch('/:id', editLeacture);

module.exports = router;
