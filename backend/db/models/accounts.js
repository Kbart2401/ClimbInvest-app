'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    previous_balance: DataTypes.DECIMAL,
    current_balance: DataTypes.DECIMAL,
    available_cash: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER
  }, {});
  Accounts.associate = function(models) {
    // associations can be defined here
  };
  return Accounts;
};