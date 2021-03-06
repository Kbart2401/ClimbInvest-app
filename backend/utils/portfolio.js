const { Stock_in_Account, Stock } = require("../db/models");
const fetch = require('node-fetch');

//for api key
const sandboxAPIKey = process.env.API_KEY_IEXCLOUD_SANDBOX
const APIKey = process.env.API_KEY_IEXCLOUD
//choose here to use sandbox key or actual key
const useKey = APIKey;

const getPortfolio = async (userAccount) => {
  if (userAccount) {
    let stockCosts = await Stock_in_Account.findAll({
      where: {
        accountId: userAccount.id
      }
    })
    let stockPrices = '';
    stocks = await Promise.all(
      stockCosts.map(async stockCost => {
        const stockName = await Stock.findByPk(stockCost.dataValues.stockId);
        stockPrices += `,${stockName.dataValues.symbol}`
        return {
          name: stockName.dataValues.name, symbol: stockName.dataValues.symbol,
          totalCost: parseFloat(stockCost.dataValues.totalCost).toFixed(2),
          quantity: stockCost.dataValues.quantity
        }
      })
    )
    //Get stock current prices and today's change for stock
    let totalMarketValue = 0;

    const url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${stockPrices}&types=quote&token=${sandboxAPIKey}`
      : `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${stockPrices}&types=quote&range=1m&last=5&token=${APIKey}`
    const res = await fetch(url)
    const latestStockPrices = await res.json()
    for (let stock of stocks) {
      let stockSym = stock.symbol.toUpperCase()
      if (stockSym in latestStockPrices) {
        stock.latestPrice = latestStockPrices[stockSym].quote.latestPrice
        totalMarketValue += stock.latestPrice * stock.quantity
        stock.change = (latestStockPrices[stockSym].quote.change) ? (latestStockPrices[stockSym].quote.change).toFixed(2) : 0.00
        stock.changePercent = (latestStockPrices[stockSym].quote.changePercent * 100).toFixed(2)
      }
    }
    //Set total account value in db
    userAccount.current_balance = totalMarketValue + parseInt(userAccount.available_cash)
    await userAccount.save()
    return stocks
  }
}

module.exports = { getPortfolio }
