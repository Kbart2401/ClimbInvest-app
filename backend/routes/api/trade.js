const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const { Stock } = require('../../db/models');
const { Stock_in_Account } = require('../../db/models');

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

}))

module.exports = router;