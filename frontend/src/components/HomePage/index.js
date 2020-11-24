import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockPage = useSelector(state => state.stockSearch.stock)
  // const [stockQuote, setQuote] = useState('');

  // useEffect(() => {
  //   dispatch(sessionActions.searchForStock('tsla'))
  // }, []);

  console.log(stockPage)

  if (!sessionUser) return <Redirect to='/' />

  return (
    <>
    {stockPage && (
      <h1>{stockPage.symbol} {stockPage.latestPrice}</h1>
    )}
    </>
    
  )
}

export default HomePage;