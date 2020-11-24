import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const [applQuote, setQuote] = useState('');

  const testData = dispatch(sessionActions.searchForStock({ stock: 'twtr'}))
  .
    .catch(res => res.data.errors);

    console.log(testData)



  if (!sessionUser) return <Redirect to='/' />

  return (
    <h1>TWTR {applQuote}!</h1>
  )
}

export default HomePage;