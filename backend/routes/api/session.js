const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { getPortfolio } = require('../../utils/accountData')
const { User, Account } = require("../../db/models");
const fetch = require('node-fetch');

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const sandboxAPIKey = process.env.API_KEY_IEXCLOUD_SANDBOX
const APIKey = process.env.API_KEY_IEXCLOUD
//choose here to use sandbox key or actual key
const useKey = sandboxAPIKey;

/******Log in******/
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });
    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    const userAccount = await Account.findOne({
      where: {
        userId: user.id
      }
    })
    //Get portfolio
    let stocks = await getPortfolio(userAccount)
    //Get news feed
    let url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/voo/news/filter=lang/?token=${sandboxAPIKey}`
      : `https://cloud.iexapis.com/stable/stock/voo/news/filter=lang/?token=${APIKey}`
    let response = await fetch(url)
    const news = await response.json()
    //Get indexes for footer
    url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=dia,qqq,spy&types=quote&token=${sandboxAPIKey}`
      : `https://cloud.iexapis.com/stable/stock/market/batch?symbols=dia,qqq,spy&types=quote&token=${APIKey}`
    response = await fetch(url)
    const indexes = await response.json()
    
    await setTokenCookie(res, user);

    return res.json({
      user,
      account: userAccount,
      stocks,
      news,
      indexes
    });
  }),
);

/****Log out****/
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    res.json({ message: 'success' });
  }
);

/******Restore session user*****/
router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    //Get user
    const { user } = req;
    let userAccount;
    //Get account
    if (user) {
      userAccount = await Account.findOne({
        where: {
          userId: user.id
        }
      })
    }
    //Get portfolio
    let stocks = await getPortfolio(userAccount)
    //Get news feed
    let url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/voo/news/filter=lang/?token=${sandboxAPIKey}`
      : `https://cloud.iexapis.com/stable/stock/voo/news/filter=lang/?token=${APIKey}`
    let response = await fetch(url)
    const news = await response.json()        
    //Get indexes for footer
    url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=dia,qqq,spy&types=quote&token=${sandboxAPIKey}`
      : `https://cloud.iexapis.com/stable/stock/market/batch?symbols=dia,qqq,spy&types=quote&token=${APIKey}`
    response = await fetch(url)
    const indexes = await response.json()
    //Send out JSON data
    if (user) {
      return res.json({
        user: user.toSafeObject(),
        account: userAccount,
        stocks,
        news,
        indexes
      });
    } else return res.json({});
  }
  ));

/******Get top investors******/
router.get('/top-investors', asyncHandler(async (req, res) => {
  let accounts = await Account.findAll()
  function compare(a, b) {
    let comparison = 0;
    let parseA = parseInt(a.current_balance)
    let parseB = parseInt(b.current_balance)
    if (parseA > parseB) comparison = -1;
    else if (parseB > parseA) comparison = 1;
    return comparison;
  }
  const sortedAccounts = accounts.sort(compare)
  if (accounts.length > 10) accounts = accounts.slice(0, 10)
  let topAccounts = await Promise.all(
    sortedAccounts.map(async account => {
      let user = await User.findByPk(account.userId)
      return { username: user.username, current_balance: account.current_balance }
    })
  )
  res.json(topAccounts)
}))

module.exports = router;