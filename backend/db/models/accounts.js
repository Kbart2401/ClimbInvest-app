'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    previous_balance: DataTypes.DECIMAL,
    current_balance: DataTypes.DECIMAL,
    available_cash: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER
  }, {});
  Account.associate = function(models) {
    Account.belongsTo(models.User, {foreignKey: 'userId'})
    Account.hasMany(models.Stock_in_Account, {foreignKey: 'accountId'})
  };
  return Account;
};














