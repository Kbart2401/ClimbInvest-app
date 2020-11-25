'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock_in_Accounts = sequelize.define('Stock_in_Accounts', {
    stockId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    cost_basis: DataTypes.DECIMAL
  }, {});
  Stock_in_Accounts.associate = function(models) {
    // associations can be defined here
  };
  return Stock_in_Accounts;
};