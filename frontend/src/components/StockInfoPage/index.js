import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';
import Footer from '../Footer';

const StockInfoPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock)
  // const [stockQuote, setQuote] = useState('');

  // useEffect(() => {
  //   dispatch(sessionActions.setStockData('tsla'))
  // }, []);

  

  return (
    <>
      {stockData && 
        <>
        <h1>{stockData.symbol} {stockData.latestPrice}</h1>
        <h1>Stock Info Page!</h1>
        </>
      }
      <Footer />
    </>

  )
}

export default StockInfoPage;