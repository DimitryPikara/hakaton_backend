const chrono = require('chrono-node');

const resGenerator = require('../../utils/resGenerator');

const takeTime = require('./lectures.helpers');

const {
  getLectureByTeacherId,
  createLecture,
  updateLecture,
} = require('./lectures.query');

module.exports = {
  async getLecturesByTeacher(req, res){
    try {
      const { id } = req.params;
      const lectures = await getLectureByTeacherId(id);
      resGenerator(res, 200, lectures);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async createLecture(req, res) {
    try {
      const { groupId } = req.query;
      const { data } = req.body;
      const lessons = [];
      data.table.table.slice(2).map((item) => {
        item.map((lesson, lessonIndex) => {
          if (lessonIndex !== 0 && lesson) {
            lessons.push({
            title: lesson,
            isOnline: lesson.includes('LMS' || 'Teams'),
            date: chrono.ru.parseDate(
            `${item[0].split(',')[1].slice(0, 3)
            + item[0].split(',')[1].slice(4)
            },${
            takeTime(lessonIndex)}`,
            ),
            // DONT LOOK, 18+ CONTENT!!!!!!!!!!!!!!!!!!!!!!!
            teacher: lesson.split(' ').reduce((acc, element, index) => {
              if (element.includes('.') && element.length === 2 && !acc) {
                return `${lesson.split(' ')[index - 1]} ${element}${lesson.split(' ')[index + 1]}`;
              }
              return acc;
              }, ''),
            });
        }
      })});
      console.log(lessons);
      const lecture = await createLecture(parsedData, groupId);
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
};
