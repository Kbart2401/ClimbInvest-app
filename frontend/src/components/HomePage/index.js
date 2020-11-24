import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';
import Footer from '../Footer';

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock)
  // const [stockQuote, setQuote] = useState('');

  // useEffect(() => {
  //   dispatch(sessionActions.setStockData('tsla'))
  // }, []);

  if (!sessionUser) return <Redirect to='/' />

  return (
    <>
    <h1>Home Page</h1>
      <Footer />
    </>
    
  )
}

export default HomePage;