import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as sessionActions from '../../store/session';
import Footer from '../Footer';
import CreateAccountModal from '../CreateAccountModal';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user));
  const stockData = useSelector(state => state.stockSearch.stock);
  const userAccount = useSelector(state => state.session.account)

  if (!sessionUser) return <Redirect to='/' />

  return (
    <>
      <h1>Home Page</h1>
      {!userAccount &&
        <CreateAccountModal />
      }
      {userAccount &&
        <>
          <div>Name: {userAccount.name}</div>
          <div>Current Value: {userAccount.current_balance}</div>
          <div>Previous Balance: {userAccount.previous_balance}</div>
          <div>Available Cash: {userAccount.available_cash}</div>
        </>
      }
      <Footer />
    </>

  )
}

export default HomePage;