import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './stockInfoPage.css';
import Footer from '../Footer';

const StockInfoPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock)

  console.log(stockData)

  return (
    <>
      <div className='stock-page-container'>
        {stockData &&
          <>
            <h1>{stockData.symbol} {stockData.latestPrice}</h1>
            <h1>Stock Info Page!</h1>
          </>
        }
      </div>
      <Footer />
    </>

  )
}

export default StockInfoPage;