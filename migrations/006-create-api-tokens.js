module.exports = {
  up: (QueryInterface, Sequelize) => QueryInterface.createTable('ApiTokens', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    accessToken: Sequelize.TEXT,
    userId: Sequelize.UUID,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('ApiTokens'),
};
