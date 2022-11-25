module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('LecturesUsers', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    lectureId: Sequelize.UUID,
    userId: Sequelize.UUID,
    isCheck: Sequelize.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('LecturesUsers'),
};
