import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const [applQuote, setQuote] = useState('');

  useEffect(() => {
    dispatch(sessionActions.searchForStock('twtr')).then((data) => setQuote(data));
  }, [dispatch]);

  if (!sessionUser) return <Redirect to='/' />

  return (
    <h1>TWTR {applQuote}!</h1>
  )
}

export default HomePage;