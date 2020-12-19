const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Account, Stock_in_Account, Stock } = require("../../db/models");
const fetch = require('node-fetch');

const router = express.Router();

const APIKey = process.env.API_KEY_IEXCLOUD

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

// Log in
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

    return res.json({
      user,
      account: userAccount
    });
  }),
);

// Log out
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
    let stocks;
    //Get account
    if (user) {
      userAccount = await Account.findOne({
        where: {
          userId: user.id
        }
      })
    }
    //Get portfolio
    if (userAccount) {
      stockCosts = await Stock_in_Account.findAll({
        where: {
          accountId: userAccount.id
        }
      })
      stocks = await Promise.all(
      stockCosts.map(async stockCost => {
        const stockName = await Stock.findByPk(stockCost.dataValues.stockId);
        return {name: stockName.dataValues.name, symbol: stockName.dataValues.symbol, 
          totalCost: stockCost.dataValues.totalCost, quantity: stockCost.dataValues.quantity
        }
      })
      )
    }
    if (user) {
      return res.json({
        user: user.toSafeObject(),
        account: userAccount,
        stocks
      });
    } else return res.json({});
  }
  ));

module.exports = router;