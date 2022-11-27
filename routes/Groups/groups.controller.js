const resGenerator = require('../../utils/resGenerator');

const {
  selectGroupForUser,
  createGroup,
  getGroupsQuery,
} = require('./groups.query');

module.exports = {
  async selectGroupForUser(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.query;
      const group = await selectGroupForUser(id, userId);
      resGenerator(res, 200, group);
    } catch (error) {
      resGenerator(res, 400, error);
    }
  },
  async createGroup(req, res) {
    try {
      const { groupId, userId } = req.query;
      const group = await createGroup(groupId, userId);
      resGenerator(res, 201, group);
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
