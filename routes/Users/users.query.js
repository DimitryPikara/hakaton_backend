const { Users } = require('../../models');

module.exports = {
  getUsersQuery() {
    return Users.findAll();
  },
  getUserById(id) {
    return Users.findOne({ where: { id } });
  },
};
