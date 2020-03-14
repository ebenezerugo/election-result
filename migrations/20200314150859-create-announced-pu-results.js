'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('announced_pu_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      result_id: {
        type: Sequelize.INTEGER
      },
      polling_unit_uniqueid: {
        type: Sequelize.INTEGER
      },
      party_abbreviation: {
        type: Sequelize.STRING
      },
      party_score: {
        type: Sequelize.INTEGER
      },
      entered_by_user: {
        type: Sequelize.STRING
      },
      date_entered: {
        type: Sequelize.STRING
      },
      user_ip_address: {
        type: Sequelize.STRING
      },
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('announced_pu_results');
  }
};