import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const [stockQuote, setQuote] = useState('');

  useEffect(() => {
    dispatch(sessionActions.searchForStock('aapl')).then((data) => setQuote(data));
  }, [dispatch]);

  console.log(stockQuote)

  if (!sessionUser) return <Redirect to='/' />

  return (
    <h1>{stockQuote.symbol} {stockQuote.latestPrice}</h1>
  )
}

export default HomePage;