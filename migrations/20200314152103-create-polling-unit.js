'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('polling_units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uniqueid: {
        type: Sequelize.INTEGER
      },
      polling_unit_id: {
        type: Sequelize.INTEGER
      },
      ward_id: {
        type: Sequelize.INTEGER
      },
      lga_id: {
        type: Sequelize.INTEGER
      },
      uniquewardid: {
        type: Sequelize.INTEGER
      },
      polling_unit_number: {
        type: Sequelize.STRING
      },
      polling_unit_name: {
        type: Sequelize.STRING
      },
      polling_unit_description: {
        type: Sequelize.TEXT
      },
      lat: {
        type: Sequelize.STRING
      },
      long: {
        type: Sequelize.STRING
      },
      entered_by_user: {
        type: Sequelize.STRING
      },
      date_entered: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('polling_units');
  }
};