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
    groupId: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    lectureId: {
      type: Sequelize.UUID,
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
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
