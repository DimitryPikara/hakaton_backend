
const { v4: uuid } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Lectures', [
      {
        id: 1,
        title: 'Shototo',
        start: new Date(),
        registrationTime: 30,
        isOnline: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'ne poydu',
        start: new Date(2022, 11, 30),
        registrationTime: 30,
        isOnline: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Kogoto',
        start: new Date(2022, 12, 12),
        registrationTime: 30,
        isOnline: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: 'Some para',
        start: new Date(2022, 12, 10),
        registrationTime: 30,
        isOnline: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: 'Some para',
        start: new Date(2022, 12, 5),
        registrationTime: 30,
        isOnline: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        title: 'Some para',
        start: new Date(),
        registrationTime: 30,
        isOnline: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lectures", null, {});
  }
};
