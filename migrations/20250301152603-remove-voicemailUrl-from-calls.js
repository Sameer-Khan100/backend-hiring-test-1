'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Calls', 'voicemailUrl');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Calls', 'voicemailUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
