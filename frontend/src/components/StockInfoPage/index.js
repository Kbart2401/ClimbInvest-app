import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './stockInfoPage.css';
import Footer from '../Footer';

const StockInfoPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock)

  console.log('stockData', stockData)

  return (
    <>
      <div className='stock-page-container'>
        {stockData &&
          <>
          <div className='top-of-page'>
            <span>As of {stockData.latestTime}</span>
            <span>{stockData.isUSMarketOpen ? `Market is open` : `Market is closed`}</span>
          </div>
            <h1>{stockData.companyName} {stockData.symbol} </h1>
            <div className='header-stock-page-container'>
              <dl>
                <dt>Last Price</dt>
                <dd>{stockData.latestPrice}</dd>
              </dl>
              <dl>
                <dt>Today's Change</dt>
                <dd>{stockData.change}</dd>
              </dl>
              <dl>
                <dt>Today's Volume</dt>
                <dd>{stockData.avgTotalVolume}</dd>
              </dl>
            </div>
            <div className='stock-page-outerbody'>
              <div className='financial-data'>
                <table>
                  <caption>Overview</caption>
                  <tbody>
                    <tr>
                      <th>Previous Close</th>
                      <td>{stockData.previousClose}</td>
                    </tr>
                    <tr>
                      <th>52 Week High</th>
                      <td>{stockData.week52High}</td>
                    </tr>
                    <tr>
                      <th>52 Week Low</th>
                      <td>{stockData.week52Low}</td>
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