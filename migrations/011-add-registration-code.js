module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Lectures', 'code', {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Lectures', 'code', {
      type: Sequelize.STRING,
    });
  },
};
