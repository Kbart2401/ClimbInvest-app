import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import * as stockSearchActions from '../../store/stockSearch';
import TradingInfo from '../TradingInfo';
import './TradePage.css';

const TradePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stockData = useSelector(state => state.stockSearch.stock);
  const userAccount = useSelector(state => state.session.account);
  const portfolio = useSelector(state => state.session.accountPortfolio);
  const formLabel1 = useRef(null);
  const formLabel2 = useRef(null);
  const reviewButton = useRef(null);
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchSubmit, setSearchSubmit] = useState(false);
  const [noData, setNoData] = useState(false);
  const [orderType, setOrderType] = useState('buy');

  //Clear the stock symbol each time the component is remounted
  useEffect(() => {
    dispatch(stockSearchActions.removeCompany())
  }, [dispatch])

  //This is to render the error when trying to fetch an invalid stock symbol
  useEffect(() => {
    setNoData(false)
    if (!stockData && searchSubmit) {
      setNoData(true);
      setSearchSubmit(false)
    }
  }, [stockData, searchSubmit])

  const getStock = () => {
    dispatch(stockSearchActions.setStockData(stockSymbol))
      .then(() => setSearchSubmit(true))
      .then(() => reviewButton.current.classList.remove('disabled'))
      .then(() => formLabel1.current.classList.remove('disabled'))
      .then(() => formLabel2.current.classList.remove('disabled'))
      .catch(() => setNoData(true))
  }

  const getShareQuant = () => {
    if (stockData) {
      for (let stock of portfolio) {
        if (stock.symbol === stockData.symbol.toLowerCase()) {
          return stock.quantity
        }
      }
      return "You don't own this stock"
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    orderType === 'buy' ? handleBuy() : handleSell()
    return history.push('/home')
  }

  const handleBuy = () => {
    dispatch(sessionActions.addNewStock({
      name: stockData.companyName, symbol: stockSymbol,
      costBasis: stockData.latestPrice, accountId: userAccount.id,
      quantity, latestPrice: stockData.latestPrice,
      change: stockData.change, changePercent: stockData.changePercent
    }))
    dispatch(sessionActions.decreaseCash(userAccount.id, stockData.latestPrice, quantity))
  }

  const handleSell = () => {
    dispatch(sessionActions.sellStock({
      symbol: stockSymbol,
      costBasis: stockData.latestPrice, accountId: userAccount.id,
      quantity, latestPrice: stockData.latestPrice,
      change: stockData.change, changePercent: stockData.changePercent
    }))
  }
  return (
    <>
      <div className='trade-page-container'>
        <div className='order-form-container'>
          <form onSubmit={handleSubmit}>
            <label>Symbol</label>
            <input placeholder='Enter Stock Symbol' value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}></input>
            <button type="button" onClick={getStock}>Get Stock</button>

            {stockData &&
              <>
                <div className='success'>Success</div>
                <div>{stockData.companyName}</div>
                <div>{stockData.latestPrice}</div>

              </>}
            {noData &&
              <div id='trade-symbol-error'>Please enter a valid symbol</div>}

            <div className='trade-action-container'>
              <div className='buy-sell-container'>
                <label className='disabled' ref={formLabel1}>Action</label>
                <select disabled={!searchSubmit} onChange={e => setOrderType(e.target.value)} >
                  <option value='buy'>Buy</option>
                  <option value='sell'>Sell</option>
                </select>
              </div>
              <div className='trade-quantity-containter'>
                <label className='disabled' ref={formLabel2}>Quantity</label>
                <input disabled={!searchSubmit} placeholder='Shares' value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value))}></input>
              </div>
            </div>

            {orderType === 'sell' &&
              <div id='trade-available-shares'>Available shares: {getShareQuant()}</div>
            }
            <button className='disabled' disabled={!searchSubmit} ref={reviewButton}>Submit order</button>
          </form>
        </div>
        <TradingInfo />
      </div>
    </>
  )
}

export default TradePage;