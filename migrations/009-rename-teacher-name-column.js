module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Lectures', 'teacherId', 'teacher');
    return await queryInterface.changeColumn('Lectures', 'teacher', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Lectures', 'teacher', 'teacherId');
    return await queryInterface.changeColumn('Lectures', 'teacherId', {
      type: Sequelize.UUID,
    }); 
  }
};
