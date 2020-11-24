import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";

const HomePage = () => {
  const sessionUser = useSelector((state => state.session.user));
  const [applQuote, setQuote] = useState('');



  if (!sessionUser) return <Redirect to='/' />

  return (
    <h1>TWTR {applQuote}!</h1>
  )
}

export default HomePage;