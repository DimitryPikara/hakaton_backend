const {
  Groups,
  Users,
} = require('../../models');

module.exports = {
  createGroup(groupId, userId) {
    return Users.update(
      { groupId },
      { 
        where: { id: userId },
        returning: true,
        plain: true,
      },
      );
  },
  async getGroupsQuery() {
    return Groups.findAll({ attributes: ['id', 'title']});
  },
  async selectGroupForUser(groupId, userId) {
    await Users.update({ groupdId, isFirstLogin: false }, { where: { id: userId } });
    return Groups.findOne({ where: { id: groupId } });
  }
};
