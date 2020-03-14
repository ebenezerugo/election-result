'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnouncedWardResult = sequelize.define('announced_ward_results', {
    result_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ward_name: DataTypes.STRING,
    party_abbreviation: DataTypes.STRING,
    party_score: DataTypes.INTEGER,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {});
  AnnouncedWardResult.associate = function(models) {
    // associations can be defined here
  };
  return AnnouncedWardResult;
};