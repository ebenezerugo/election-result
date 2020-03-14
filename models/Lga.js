'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lga = sequelize.define('lga', {
    uniqueid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lga_id: DataTypes.INTEGER,
    lga_name: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    lga_description: DataTypes.INTEGER,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'lga'
  });
  Lga.associate = function(models) {
    // associations can be defined here
  };
  return Lga;
};