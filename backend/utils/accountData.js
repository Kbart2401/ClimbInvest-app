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
    let stocks = await Promise.all(
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

    //Set variable to add total stock price change for the day - needed for previous-day account balance
    let totalChange = 0;
    //Set data for each stock in portfolio
    for (let stock of stocks) {
      let stockSym = stock.symbol.toUpperCase()
      if (stockSym in latestStockPrices) {
        stock.latestPrice = latestStockPrices[stockSym].quote.latestPrice
        totalMarketValue += stock.latestPrice * stock.quantity
        stock.change = (latestStockPrices[stockSym].quote.change) ? (latestStockPrices[stockSym].quote.change).toFixed(2) : 0.00
        stock.changePercent = (latestStockPrices[stockSym].quote.changePercent * 100).toFixed(2)
        stock.totalChange = parseFloat(stock.change) * stock.quantity
        totalChange += stock.totalChange
      }
    }
    //Set total account value in db
    userAccount.current_balance = totalMarketValue + parseFloat(userAccount.available_cash)

    //Check date here to see if it's not same as today and need to update Previous Balance for account
    //We don't need to worry about available cash effecting the previous day balance since there is no commission charge for trades, can only lose value on depreciation
    let date = Date()
    date = date.slice(0, 15)
    let previous = userAccount.updatedAt
    previous = previous.toDateString()

    if (date != previous) {
      userAccount.previous_balance = userAccount.current_balance - totalChange
    }

    await userAccount.save()
    return stocks
  }
}

const newsFeed = async () => {
  //Get news feed
  let url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/voo/news/filter=lang/?token=${sandboxAPIKey}`
    : `https://cloud.iexapis.com/stable/stock/voo/news/filter=lang/?token=${APIKey}`
  let response = await fetch(url)
  const news = await response.json()
  return news
}

const getIndexes = async () => {
  //Get indexes for footer
  url = (useKey === sandboxAPIKey) ? `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=dia,qqq,spy&types=quote&token=${sandboxAPIKey}`
    : `https://cloud.iexapis.com/stable/stock/market/batch?symbols=dia,qqq,spy&types=quote&token=${APIKey}`
  response = await fetch(url)
  const indexes = await response.json()
  return indexes
}

module.exports = { getPortfolio, newsFeed, getIndexes }
