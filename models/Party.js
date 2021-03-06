'use strict';
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('party', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    partyid: DataTypes.STRING,
    partyname: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'party'
  });
  Party.associate = function(models) {
    // associations can be defined here
  };
  return Party;
};