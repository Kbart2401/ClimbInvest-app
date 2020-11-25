'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock_in_Account = sequelize.define('Stock_in_Account', {
    stockId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    cost_basis: DataTypes.DECIMAL
  }, {});
  Stock_in_Account.associate = function(models) {
    // associations can be defined here
  };
  return Stock_in_Account;
};