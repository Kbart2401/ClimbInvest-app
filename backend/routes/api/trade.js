const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const { Stock, Stock_in_Account, Account } = require('../../db/models');

const router = express.Router();

const sandboxAPIKey = process.env.API_KEY_IEXCLOUD_SANDBOX
const APIKey = process.env.API_KEY_IEXCLOUD
//choose here to use sandbox key or actual key
const useKey = sandboxAPIKey;

/**********Add stock*********/
router.post('/', asyncHandler(async (req, res, next) => {
  const { name, symbol, cost_basis, accountId, quantity } = req.body;
  //set total cost of transaction
  let totalCost = cost_basis * quantity

  //Find if stock is existing or add new stock to Stock table
  let findStock = await Stock.findOne({
    where: {
      symbol: symbol
    }
  })
  if (!findStock) {
    findStock = await Stock.create({
      name, symbol
    })
  }
  //see if stock is in stock_in_account, if so, add quantity 
  //Note: cost basis remains the cost of the first purchase of stock
  const { id } = findStock
  let stockAlreadyInAccount = await Stock_in_Account.findOne({
    where: {
      stockId: id, accountId: accountId
    }
  })
  let addStock;
  if (stockAlreadyInAccount) {
    stockAlreadyInAccount.quantity += quantity;
    stockAlreadyInAccount.totalCost = parseInt(stockAlreadyInAccount.totalCost) + totalCost;
    await stockAlreadyInAccount.save();
    addStock = stockAlreadyInAccount;
  }
  else {
    addStock = await Stock_in_Account.create({
      stockId: id, accountId, totalCost, quantity
    })
  }
  res.json({ name: findStock.name, symbol: findStock.symbol,
  totalCost: addStock.totalCost, quantity: addStock.quantity })
}))


/********decrease available cash*******/
router.patch('/', asyncHandler(async (req, res) => {
  const getAccount = await Account.findByPk(req.body.accountId)
  let accountCash = parseInt(getAccount.available_cash)
  let changeVal = parseInt(req.body.amount)
  accountCash -= changeVal;
  getAccount.available_cash = accountCash;
  await getAccount.save()
  res.json({ accountCash })
}))

/*******sell stock*********/
router.delete('/', asyncHandler(async (req, res) => {
  const { symbol, cost_basis, accountId, quantity } = req.body;
  //proceeds for sale
  let totalSale = cost_basis * quantity;

  //Increase available cash
  const getAccount = await Account.findByPk(accountId);
  let accountCash = parseInt(getAccount.available_cash)
  accountCash += totalSale
  getAccount.available_cash = accountCash
  getAccount.save()

  //find stock being sold
  let findStock = await Stock.findOne({
    where: {
      symbol: symbol
    }
  })
  const { id } = findStock
  //Decrease stock quantity and cost
  const stockInAccount = await Stock_in_Account.findOne({
    where: {
      stockId: id, accountId: accountId
    }
  })
  stockInAccount.quantity -= quantity;
  stockInAccount.totalCost = parseInt(stockInAccount.totalCost) - totalSale
  await stockInAccount.save()
  res.json({accountCash: getAccount.available_cash, stock: stockInAccount})

}))

module.exports = router;