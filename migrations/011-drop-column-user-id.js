module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('LectureUsers', 'userId', {
      type: Sequelize.UUID,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('LectureUsers', 'userId', {
      type: Sequelize.UUID,
    });
  },
};
