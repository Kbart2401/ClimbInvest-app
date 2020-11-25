'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    price: DataTypes.DECIMAL
  }, {});
  Stock.associate = function(models) {
    const columnMapping = {
      through: 'Stock_in_Account',
      foreignKey: 'stockId'
    }
    Stock.belongsToMany(models.Stock_in_Account, columnMapping)
  };
  return Stock;
};