'use strict';
module.exports = (sequelize, DataTypes) => {
  const AgentName = sequelize.define('agentname', {
    name_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    pollingunit_uniqueid: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'agentname'
  });
  AgentName.associate = function(models) {
    // associations can be defined here
  };
  return AgentName;
};