module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('Groups', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: Sequelize.STRING,
  }),
  down: (queryInterface) => QueryInterface.dropTable('Groups'),
};
