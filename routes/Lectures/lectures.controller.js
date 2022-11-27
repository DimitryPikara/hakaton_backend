const chrono = require('chrono-node');
const { Parser } = require('json2csv');
const { Lecture, LecturesUsers }= require('../../models');

const resGenerator = require('../../utils/resGenerator');

const takeTime = require('./lectures.helpers');

const {
  getLectureByTeacherName,
  createLecture,
  updateLecture,
  getLectureByGroupId,
} = require('./lectures.query');

module.exports = {
  async getLecturesByTeacher(req, res){
    try {
      const { name } = req.params;
      const lectures = await getLectureByTeacherName(name);
      resGenerator(res, 200, lectures);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async createLecture(req, res) {
    try {
      const { groupId } = req.query;
      const { data } = req.body;
      const lecture = await createLecture(data);
      resGenerator(res, 201, lecture);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async editLeacture(req, res) {
    try {
      const { id } = req.params;
      const { start, end } = req.body;
      const lecture = await updateLecture(id, start, end);
      resGenerator(res, 200, lecture);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async getLecturesByGroup(req, res){
    try {
      const { id } = req.params;
      const lectures = await getLectureByGroupId(id);
      resGenerator(res, 200, lectures);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async exportCsv(req, res) {
    try {
      const myCars = [
        {
          "Преподаватель": "Алексеев Д.М.",
          "Дисциплина": "Низкоуровневое программирование",
          "Группа": "КТсо3-6",
          "ФИО": "Пикара Дмитрий Романович",
          "Посещение": { make: '+', color: 'green' },
        },
        {
          "Преподаватель": "Алексеев Д.М.",
          "Дисциплина": "Низкоуровневое программирование",
          "Группа": "КТсо3-6",
          "ФИО": "Пономарев Дмитрий Сергеевич",
          "Посещение": "+",
        },
        {
          "Преподаватель": "Алексеев Д.М.",
          "Дисциплина": "Низкоуровневое программирование",
          "Группа": "КТсо3-6",
          "ФИО": "Смеловский Денис Андреевич",
          "Посещение": "+",
        },
        {
          "Преподаватель": "Алексеев Д.М.",
          "Дисциплина": "Низкоуровневое программирование",
          "Группа": "КТсо3-6",
          "ФИО": "Скалиух Кристина Олеговна",
          "Посещение": "+",
        },
        {
          "Преподаватель": "Алексеев Д.М.",
          "Дисциплина": "Низкоуровневое программирование",
          "Группа": "КТсо3-6",
          "ФИО": "Метус Максим Игоревич",
          "Посещение": "+",
        }
      ];
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(myCars);
      
      const resultDoc = Buffer.from(csv, 'utf-8').toString('base64');
      resGenerator(res, 200, resultDoc);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async registerLecture(req, res) {
    const { lectureId, userId, code } = req.body;
    const lecture = await Lecture.findOne({where: { id: lectureId }});
    if (lecture.code !== code) resGenerator(res, 400, { message: "Wrong registration code "});
    const lectureUser = await LecturesUsers.create({ lectureId, userId, isCheck: true });
    resGenerator(res, 200, lectureUser);
  }
};
