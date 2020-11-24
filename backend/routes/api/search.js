const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');

const router = express.Router();

//fetch stock quote
router.post('/', asyncHandler(async (req, res, next) => {
  const quote = await fetch(`https://sandbox.iexapis.com/stable/stock/twtr/quote/latestPrice?token=${process.env.REACT_APP_API_KEY_IEXCLOUD}`)
  const data = await quote.json();
  res.json(data);
}))

module.exports = router;