module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('Groups', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    usersId: Sequelize.UUID,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }),
  down: (queryInterface) => QueryInterface.dropTable('Groups'),
};
