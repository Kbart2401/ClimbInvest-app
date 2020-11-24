import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";

const HomePage = () => {
  const sessionUser = useSelector((state => state.session.user));
  const [applQuote, setQuote] = useState('');

  useEffect( () => {
    const fetchData = async () => {
      console.log(process.env)
      const res = await fetch(`https://sandbox.iexapis.com/stable/stock/twtr/quote/latestPrice?token=${process.env.REACT_APP_API_KEY_IEXCLOUD}
`)
      console.log('res', res)
      setQuote(res.data);
  }
  fetchData();
}, [])

  if (!sessionUser) return <Redirect to='/' />

  return (
    <h1>TWTR {applQuote}!</h1>
  )
}

export default HomePage;