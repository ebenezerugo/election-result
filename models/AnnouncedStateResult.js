'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnouncedStateResult = sequelize.define('announced_state_results', {
    result_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    state_name: DataTypes.STRING,
    party_abbreviation: DataTypes.STRING,
    party_score: DataTypes.INTEGER,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.STRING,
    user_ip_address: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'announced_state_results'
  });
  AnnouncedStateResult.associate = function(models) {
    // associations can be defined here
  };
  return AnnouncedStateResult;
};