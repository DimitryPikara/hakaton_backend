module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('GroupsLectures', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    groupId: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    lectureId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
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
