const resGenerator = require('../../utils/resGenerator');

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
      const lecture = await createLecture(req.body);
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
