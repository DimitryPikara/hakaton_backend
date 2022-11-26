module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'displayName', {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'displayName', {
      type: Sequelize.STRING,
    });
  },
};
