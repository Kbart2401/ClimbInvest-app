const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const { Stock, Stock_in_Account, Account } = require('../../db/models');

const router = express.Router();

const sandboxAPIKey = process.env.API_KEY_IEXCLOUD_SANDBOX
const APIKey = process.env.API_KEY_IEXCLOUD
//choose here to use sandbox key or actual key
const useKey = sandboxAPIKey;

//Add stock 
router.post('/', asyncHandler(async (req, res, next) => {
  const { name, symbol, cost_basis, accountId } = req.body;
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
  const { id } = findStock
  const addStock = await Stock_in_Account.create({
    stockId: id, accountId, cost_basis
  })
  res.json({ addStock, findStock })
}))

//decrease available cash
router.patch('/', asyncHandler(async (req, res) => {
  console.log('INSIDE PATCH ROUTE!!!!')
  const getAccount = await Account.findByPk(req.body.accountId)
  let accountCash = parseInt(getAccount.available_cash)
  let changeVal = parseInt(req.body.amount)
  accountCash -= changeVal;
  getAccount.available_cash = accountCash;
  await getAccount.save()
  res.json({accountCash})
}))

module.exports = router;