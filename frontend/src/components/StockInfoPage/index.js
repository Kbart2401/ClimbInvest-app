import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './stockInfoPage.css';
import Footer from '../Footer';

const StockInfoPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock);
  const companyData = useSelector(state => state.stockSearch.company);

  console.log('stockData', stockData)
  console.log('companyData', companyData)

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
                <dd>{stockData.volume}</dd>
              </dl>
            </div>
            <div className='stock-page-outerbody'>
              <div>{companyData.description}</div>
              <div className='stock-financial-data'>
                <table>
                  <caption>Overview</caption>
                  <tbody>
                    <tr>
                      <th>Previous Close</th>
                      <td>${stockData.previousClose}</td>
                    </tr>
                    <tr>
                      <th>52 Week High</th>
                      <td>${stockData.week52High}</td>
                    </tr>
                    <tr>
                      <th>52 Week Low</th>
                      <td>${stockData.week52Low}</td>
                    </tr>
                    <tr>
                      <th>Avg 30 Day Volume</th>
                      <td>{stockData.avgTotalVolume}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        }
      </div>
      <Footer />
    </>
  )
}

export default StockInfoPage;