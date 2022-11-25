module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lectures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      teacherId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      start: Sequelize.DATE,
      end: Sequelize.DATE,
      isOnline: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lectures');
  }
};