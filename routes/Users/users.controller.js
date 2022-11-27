const resGenerator = require('../../utils/resGenerator');

const { getUsersQuery, getUserById, getUsersLecture } = require('./users.query');
const { Users } = require('../../models');

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
  },
  async createUser(req, res) {
    try {
      const { displayName } = req.body;
      const user = await Users.create({
        displayName,
        role: "student",
        groupId: "56a39521-a1b4-4ed7-b503-65a16151d889",
        isFirstLogin: false,
      });
      resGenerator(res, 200, user);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
};
