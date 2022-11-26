module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'isFirstLogin', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },
};
