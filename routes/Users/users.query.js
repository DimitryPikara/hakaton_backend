const { Users } = require('../../models');

module.exports = {
  getUsersQuery() {
    return Users.findAll();
  },
};
