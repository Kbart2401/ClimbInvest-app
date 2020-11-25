const express = require('express');
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const { Account } = require('../../db/models');

const router = express.Router();

//create a new account
router.post('/', asyncHandler(async (req, res, next) => {
  const { name, userId } = req.body
  console.log('NAME', name)
  const account = await Account.create({
    userId, name: "Test", previous_balance: 10000,
    current_balance: 10000, available_cash: 10000
  })
  res.json({account});
}))

module.exports = router;