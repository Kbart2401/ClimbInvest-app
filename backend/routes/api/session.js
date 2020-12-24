const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { getPortfolio } = require('../../utils/portfolio')
const { User, Account, Stock_in_Account, Stock } = require("../../db/models");

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
    await setTokenCookie(res, user);
    //Get portfolio
    let stocks = await getPortfolio(userAccount)

    return res.json({
      user,
      account: userAccount,
      stocks
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
    if (user) {
      return res.json({
        user: user.toSafeObject(),
        account: userAccount,
        stocks
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