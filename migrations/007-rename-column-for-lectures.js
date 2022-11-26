module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Lectures', 'end', 'registrationTime');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Lectures', 'registrationTime', 'end');
  }
};
