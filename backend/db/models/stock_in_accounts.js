'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock_in_Account = sequelize.define('Stock_in_Account', {
    stockId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    cost_basis: DataTypes.DECIMAL
  }, {});
  Stock_in_Account.associate = function(models) {
    Stock_in_Account.hasMany(models.Stock, {foreignKey: 'stockId'})
    
  };
  return Stock_in_Account;
};