const {
  Groups,
  Users,
} = require('../../models');

module.exports = {
  async addUser(groupId, data) {
    try {
      const existGroup = await Groups.findOne({
        where: { id: groupId },
        include: [
          {
            model: Users,
            as: 'users',
          }
        ],
      });

      if (!existGroup) throw new Error('Group not found!');

      const groupWithNewUser = {
        ...existGroup,
        data,
      };

      return Groups.update(groupWithNewUser, {
        where: { id: groupId },
        returning: true,
        plain: true,
      });
    } catch (error) {
      throw error;
    }
  },
  async deleteUser(groupId, userId) {
    try {
      const existGroup = await Groups.findOne({
        where: { id: groupId },
        include: [
          {
            model: Users,
            as: 'users',
          }
        ],
      });

      if (!existGroup) throw new Error('Group not found!');

      const filteredGroup = existGroup.users.filter((user) => user.id !== userId);

      return Groups.update(filteredGroup, {
        where: { id: groupId },
        returning: true,
        plain: true,
      });
    } catch (error) {
      throw error;
    }
  },
  async createGroup(data) {
    return Groups.create(data);
  },
  deleteGroup(id) {
    return Groups.destroy({ where: { id } });
  },
  async getGroupsQuery() {
    return Groups.findAll({ attributes: ['id', 'title']});
  }
};
