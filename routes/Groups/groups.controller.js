const resGenerator = require('../../utils/resGenerator');

const {
  addUser,
  deleteUser,
  createGroup,
  deleteGroup,
  getGroupsQuery,
} = require('./groups.query');

module.exports = {
  async addUser(req, res) {
    try {
      const { id } = req.params;
      const group = await addUser(id, req.body);
      resGenerator(res, 201, group);
    } catch (error) {
      resGenerator(res, 401, error);
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.query;
      const group = await deleteUser(id, userId);
      resGenerator(res, 200, group); 
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async createGroup(req, res) {
    try {
      const group = await createGroup(req.body);
      resGenerator(res, 201, group);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async deleteGroup(req, res) {
    try {
      const { id } = req.params;
      await deleteGroup(id);
      resGenerator(res, 200);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async getGroups(req, res) {
    try {
      const groups = await getGroupsQuery();
      resGenerator(res, 200, groups);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  }
};
