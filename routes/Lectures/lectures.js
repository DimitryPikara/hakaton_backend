const express = require('express');

const router = express.Router();

const {
  getLecturesByTeacher,
  createLecture,
  editLeacture,
  getLecturesByGroup,
  exportCsv,
  registerLecture,
} = require('./lectures.controller');

router.get('/teacher/:name', getLecturesByTeacher);

router.get('/student/:id', getLecturesByGroup);

router.get('/export', exportCsv);

router.post('/create', createLecture);

router.patch('/:id', editLeacture);

router.post('/register', registerLecture);

module.exports = router;
