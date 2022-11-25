const resGenerator = require('../../utils/resGenerator');

const { getUsersQuery } = require('./users.query');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await getUsersQuery();
      resGenerator(res, 200, users);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
};
