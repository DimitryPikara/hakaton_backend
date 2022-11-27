const resGenerator = require('../../utils/resGenerator');

const { getUsersQuery, getUserById, getUsersLecture } = require('./users.query');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await getUsersQuery();
      resGenerator(res, 200, users);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      resGenerator(res, 200, user);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async getUserByLectureId(req, res) {
    try {
      const { id } = req.params;
      const users = await getUsersLecture(id);
      resGenerator(res, 200, users);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  }
};
