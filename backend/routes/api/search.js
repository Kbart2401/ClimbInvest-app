const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const {useKey, sandboxAPIKey, APIKey} = require('../../utils/setKey');

const router = express.Router();

//fetch latest stock standard info, price etc
router.post('/', asyncHandler(async (req, res, next) => {
  const url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/${req.body.stock}/batch?types=quote,company,chart,news&range=1m&last=10&chartCloseOnly=true&token=${sandboxAPIKey}`
    : `https://cloud.iexapis.com/stable/stock/${req.body.stock}/batch?types=quote,company,chart,news&range=1m&last=10&chartCloseOnly=true&token=${APIKey}`;

  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json();
    res.json(data);
  }
  else {
    const err = new Error('Invalid stock symbol');
    err.status = 401;
    err.title = 'Invalid stock symbol';
    err.errors = ['Your stock request was invalid.'];
    next(err);
  }
}))


module.exports = router;