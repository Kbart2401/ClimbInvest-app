const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');

const router = express.Router();

//fetch latest stock quote price
router.post('/', asyncHandler(async (req, res, next) => {
  const url = `https://sandbox.iexapis.com/stable/stock/${req.body.stock}/quote?token=${process.env.API_KEY_IEXCLOUD}`
  const quote = await fetch(url)
  const data = await quote.json();
  res.json(data);
}))

router.get('/', asyncHandler(async (req, res, next) => {
  const url = `https://sandbox.iexapis.com/stable/stock/${req.body.stock}/quote?token=${process.env.API_KEY_IEXCLOUD}`
  console.log('TESTING INSIDE GET!!')
  res.json(data)
}))

module.exports = router;