'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnouncedPuResult = sequelize.define('announced_pu_results', {
    result_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    polling_unit_uniqueid: DataTypes.INTEGER,
    party_abbreviation: DataTypes.STRING,
    party_score: DataTypes.INTEGER,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'announced_pu_results'
  });
  AnnouncedPuResult.associate = function(models) {
    // associations can be defined here
  };
  return AnnouncedPuResult;
};