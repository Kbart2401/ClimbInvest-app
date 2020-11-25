'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stocks = sequelize.define('Stocks', {
    price: DataTypes.DECIMAL
  }, {});
  Stocks.associate = function(models) {
    // associations can be defined here
  };
  return Stocks;
};