'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    name: DataTypes.STRING,
    previous_balance: DataTypes.DECIMAL,
    current_balance: DataTypes.DECIMAL,
    available_cash: DataTypes.DECIMAL,
    userId: {
      type: DataTypes.INTEGER,
      unique: true
    }
  }, {});
  Account.associate = function(models) {
    Account.belongsTo(models.User, {foreignKey: 'userId'})
    Account.hasMany(models.Stock_in_Account, {foreignKey: 'accountId'})
    Account.hasMany(models.Historic_data, {foreignKey: 'accountId'})
  };
  return Account;
};














