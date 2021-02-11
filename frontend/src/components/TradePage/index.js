import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import * as stockSearchActions from '../../store/stockSearch';
import Footer from '../Footer';
import './TradePage.css';

const TradePage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchSubmit, setSearchSubmit] = useState(false)
  const [noData, setNoData] = useState(false)
  const [orderType, setOrderType] = useState('buy')
  const stockData = useSelector(state => state.stockSearch.stock);
  const userAccount = useSelector(state => state.session.account);

  useEffect(() => {
    dispatch(stockSearchActions.removeCompany())
  }, [dispatch])

  useEffect(() => {
    setNoData(false)
    if (!stockData && searchSubmit) {
      setNoData(true);
      setSearchSubmit(false)
    }
  }, [stockData, searchSubmit])

  const getStock = () => {
    setSearchSubmit(true);
    dispatch(stockSearchActions.setStockData(stockSymbol))
      .catch(() => setNoData(true))
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
      <div className='below-nav-container'>
        <div className='trade-page-container'>
          <div className='buy-order-container'>
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
                <div>Please enter a valid symbol</div>}
              <label>Action</label>
              <select onChange={e => setOrderType(e.target.value)} placeholder='hi' >
                <option value=''>Select an order type</option>
                <option value='buy'>Buy</option>
                <option value='sell'>Sell</option>
              </select>
              <label>Quantity</label>
              <input placeholder='Shares' value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}></input>
              <button>Review order</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TradePage;