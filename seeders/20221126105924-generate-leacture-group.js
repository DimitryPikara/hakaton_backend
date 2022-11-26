const { v4: uuid } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GroupsLectures', [
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lecture: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lecture: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        groupId: '6bebdded-5e0e-486b-a5ff-a50149f10a08',
        lectureId: '6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('GroupsLectures', null, {});
  }
};
