'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnouncedLgaResult = sequelize.define('announced_lga_results', {
    result_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lga_name: DataTypes.STRING,
    party_abbreviation: DataTypes.STRING,
    party_score: DataTypes.INTEGER,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.STRING,
    user_ip_address: DataTypes.STRING
  }, {});
  AnnouncedLgaResult.associate = function(models) {
    // associations can be defined here
  };
  return AnnouncedLgaResult;
};