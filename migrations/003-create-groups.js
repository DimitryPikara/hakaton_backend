module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('Groups', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    usersId: {
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
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Groups'),
};
