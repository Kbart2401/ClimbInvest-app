'use strict';
module.exports = (sequelize, DataTypes) => {
  const Historic_data = sequelize.define('Historic_data', {
    accountId: DataTypes.INTEGER,
    account_value: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Historic_data.associate = function(models) {
    // associations can be defined here
  };
  return Historic_data;
};