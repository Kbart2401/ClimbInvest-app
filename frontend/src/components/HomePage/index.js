import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';
import Footer from '../Footer';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock)
  const [window, setWindow] = useState(false);
  
  const toggleWindow = () => {
    if (!window) setWindow(true)
    else setWindow(false)
   
  }

  if (!sessionUser) return <Redirect to='/' />

  return (
    <> 
    {/* <div > */}
    <h1>Home Page</h1>
    <button onClick={toggleWindow}>Create an Account</button>
      {window && 
      <form className='create-account-modal' onSubmit={toggleWindow}>
        <input placeholder='Type something'></input>
      </form>
}
      {/* </div> */}
      <Footer />
    </>
    
  )
}

export default HomePage;