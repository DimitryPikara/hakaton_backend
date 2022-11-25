module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('GroupsLectures', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    groupId: Sequelize.UUID,
    lectureId: Sequelize.UUID,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('GroupsLectures'),
};
