'use strict';
module.exports = (sequelize, DataTypes) => {
  const PollingUnit = sequelize.define('polling_unit', {
    uniqueid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    polling_unit_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    lga_id: DataTypes.INTEGER,
    uniquewardid: DataTypes.INTEGER,
    polling_unit_number: DataTypes.STRING,
    polling_unit_name: DataTypes.STRING,
    polling_unit_description: DataTypes.TEXT,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {});
  PollingUnit.associate = function(models) {
    // associations can be defined here
  };
  return PollingUnit;
};