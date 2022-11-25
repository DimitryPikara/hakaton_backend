const express = require('express');

const router = express.Router();

const {
  getLecturesByTeacher,
  createLecture,
  editLeacture,
} = require('./lectures.controller');

router.get('/:id', getLecturesByTeacher);

router.post('/create', createLecture);

router.patch('/:id', editLeacture);

module.exports = router;
