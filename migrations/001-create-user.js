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
    group: Sequelize.STRING,
  }),
  down: (queryInterface) => QueryInterface.dropTable('Users'),
};
