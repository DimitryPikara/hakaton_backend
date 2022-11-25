module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('Users', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    patronymic: Sequelize.STRING,
    role: {
      type: Sequelize.STRING,
      allowNull: false,
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
  down: (queryInterface) => QueryInterface.dropTable('Users'),
};
