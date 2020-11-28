import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './stockInfoPage.css';
import Footer from '../Footer';
import StockProfilePage from '../StockProfilePage';
import StockOverview from '../StockOverview';

const StockInfoPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock);
  const companyData = useSelector(state => state.stockSearch.company);
  const [profilePage, setProfilePage] = useState(false)
  const [overview, setOverview] = useState(true)

  //console logs to check out stock objects
  console.log('stockData', stockData)
  console.log('companyData', companyData)

  const handleProfileClick = () => {
    setProfilePage(true);
    setOverview(false);
  }

  const handleOverviewClick = () => {
    setOverview(true);
    setProfilePage(false);
  }

  return (
    <>
      <div className='stock-page-container'>
        {stockData && companyData &&
          <>
            <div className='top-of-page'>
              <span>As of {stockData.latestTime}</span>
              <span>Market is&nbsp;
               <span className={stockData.isUSMarketOpen ? `green` : `red`}>
                  {stockData.isUSMarketOpen ? `Open` : `Closed`}</span>
              </span>
            </div>
            <h1 className='stock-header'>
              {stockData.companyName} {stockData.symbol} : {stockData.primaryExchange} </h1>
            <div className='header-stock-page-container'>
              <dl>
                <dt>Last Price</dt>
                <dd>${stockData.latestPrice}</dd>
              </dl>
              <dl>
                <dt>Today's Change</dt>
                <dd className={(stockData.change < 0) ? 'red' : 'green'}>
                  {(stockData.change > 0) ?
                    `+${stockData.change} / ${(stockData.changePercent * 100).toFixed(2)}%`
                    : `${stockData.change} / ${(stockData.changePercent * 100).toFixed(2)}%`}</dd>
              </dl>
              <dl>
                <dt>Today's Volume</dt>
                <dd>{(stockData.volume).toLocaleString()}</dd>
              </dl>
            </div>
            <div className='stock-buttons'>
              <button className={`stock-page-button ${overview ? 'is-selected' : ''}`}
                onClick={handleOverviewClick}>Overview</button>
              <button className={`stock-page-button ${profilePage ? 'is-selected' : ''}`}
                onClick={handleProfileClick}>Profile</button>
              <div id='page-divider'></div>
            </div>
            <div className='stock-page-outerbody'>
              {profilePage &&
                <StockProfilePage companyData={companyData}
                  stockData={stockData} />
              }
              {overview &&
                <StockOverview companyData={companyData}
                  stockData={stockData} />
              }
            </div>
          </>
        }
      </div>
      <Footer />
    </>
  )
}

export default StockInfoPage;