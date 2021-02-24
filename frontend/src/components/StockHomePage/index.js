import { useState } from "react";
import { useSelector } from "react-redux";
import './StockHomePage.css';
import Footer from '../Footer';
import StockProfilePage from '../StockProfilePage';
import StockOverview from '../StockOverview';

const StockHomePage = () => {
  const stockData = useSelector(state => state.stockSearch.stock?.quote)
  const companyData = useSelector(state => state.stockSearch.stock?.company)
  const companyNews = useSelector(state => state.stockSearch.stock?.news)
  const chartData = useSelector(state => state.stockSearch.stock?.chart)
  const [profilePage, setProfilePage] = useState(false)
  const [overview, setOverview] = useState(true)

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
      <div className='below-nav-container'>
        {stockData &&
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
                <dd>{stockData.volume ? (stockData.volume).toLocaleString() : '–'}</dd>
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
              {overview &&
                <StockOverview companyData={companyData}
              stockData={stockData} companyNews={companyNews} chartData={chartData}/>
              }
              {profilePage &&
                <StockProfilePage companyData={companyData}
                  stockData={stockData} />
              }
            </div>
          <div className='top-news-container-home'>
            <h2 style={{ color: '#013462', fontFamily: "'Karla', sans-serif"}}>{stockData.companyName} News Stories</h2>
            <ul>
              {companyNews?.map((article, idx) => (
                <li key={idx}><a href={article.url} target='_blank' rel='noreferrer'>
                  <img src={article.image} alt='news' /></a>
                  <div className='article-container'>
                    <div className='article-header'>{article.headline}</div>
                    <div className='article-summary'>{article.summary}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          </>
        }
      </div>
      <Footer />
    </>
  )
}

export default StockHomePage;