'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Jobs', 'description', {
      type: Sequelize.TEXT
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Jobs', 'description', {
      type: Sequelize.STRING
    });
  }
};