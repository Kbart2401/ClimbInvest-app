const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const { Stock } = require('../../db/models');

const router = express.Router();

const sandboxAPIKey = process.env.API_KEY_IEXCLOUD_SANDBOX
const APIKey = process.env.API_KEY_IEXCLOUD
//choose here to use sandbox key or actual key
const useKey = sandboxAPIKey;

//Add stock route
router.post('/', asyncHandler(async (req, res, next) => {
  const { name, symbol, price } = req.body;
  const stock = await Stock.create({
    name, symbol, price
  })
}))

module.exports = router;