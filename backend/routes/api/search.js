const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');

const router = express.Router();

const sandboxAPIKey = process.env.API_KEY_IEXCLOUD_SANDBOX
const APIKey = process.env.API_KEY_IEXCLOUD
//choose here to use sandbox key or actual key
const useKey = APIKey;


//fetch latest stock standard info, price etc
router.post('/', asyncHandler(async (req, res, next) => {
  const url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/${req.body.stock}/quote?token=${sandboxAPIKey}`
    : `https://cloud.iexapis.com/stable/stock/${req.body.stock}/quote?token=${APIKey}`;

  const quote = await fetch(url)
  const data = await quote.json();
  res.json(data);
}))

//fetch company info
router.post('/company_data', asyncHandler(async (req, res, next) => {
  const url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/${req.body.company}/company?token=${sandboxAPIKey}`
    : `https://cloud.iexapis.com/stable/stock/${req.body.company}/company?token=${APIKey}`;
  const company = await fetch(url)
  const data = await company.json();
  res.json(data);
}))


module.exports = router;