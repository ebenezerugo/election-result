'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ward = sequelize.define('ward', {
    uniqueid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ward_id: DataTypes.INTEGER,
    ward_name: DataTypes.STRING,
    lga_id: DataTypes.INTEGER,
    ward_description: DataTypes.TEXT,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {});
  Ward.associate = function(models) {
    // associations can be defined here
  };
  return Ward;
};