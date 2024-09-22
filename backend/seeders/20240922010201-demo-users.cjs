"use strict";
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const users = [];

    for (let i = 0; i < 10; i++) {
      const passwordHash = await bcrypt.hash("password123", saltRounds);
      users.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
