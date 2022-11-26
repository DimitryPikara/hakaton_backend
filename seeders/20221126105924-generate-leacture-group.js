const { v4: uuid } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GroupsLectures', [
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '1',
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '2',
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '3',
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '4',
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '5',
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '6',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('GroupsLectures', null, {});
  }
};
