import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './TradePage.css';
import Footer from '../Footer';
import * as stockSearchActions from '../../store/stockSearch';
import * as stockTradeActions from '../../store/stockTrade';


const TradePage = () => {
  const dispatch = useDispatch();
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchSubmit, setSearchSubmit] = useState(false)
  const [noData, setNoData] = useState(false)
  const stockData = useSelector(state => state.stockSearch.stock);
  const userAccount = useSelector(state => state.session.account);

  useEffect(() => {
    if (!stockData && searchSubmit) {
      setNoData(true);
      setSearchSubmit(false)
    }
  })

  const getStock = () => {
    setSearchSubmit(true);
    dispatch(stockSearchActions.setStockData(stockSymbol));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(stockTradeActions.addNewStock({
      name: stockData.companyName, symbol: stockSymbol,
      costBasis: stockData.latestPrice, accountId: userAccount.id,
      quantity: quantity
    }))
    dispatch(sessionActions.decreaseCash(userAccount.id, stockData.latestPrice))
  }
  return (
    <>
      <div className='below-nav-container'>
        <div className='trade-page-container'>
          <h2>Place a Buy Order</h2>
          <div className='buy-order-container'>
            <form onSubmit={handleSubmit}>
              <label>Buy Stock</label>
              <input placeholder='Enter Stock Symbol' value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}></input>
              <button type="button" onClick={getStock}>Get Stock</button>
              {stockData &&
                <>
                  <div className='success'>Success</div>
                  <div>{stockData.latestPrice}</div>
                  <label>Quantity</label>
                  <input placeholder='Shares' value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value))}></input>
                  <button>Submit</button>
                </>}
              {noData && !stockData &&
                <div>Please enter a valid symbol</div>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TradePage;