import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as stockSearchActions from '../../store/stockSearch';
import Footer from '../Footer';
import CreateAccountModal from '../CreateAccountModal';
import PortfolioView from '../PortfolioView';
import './HomePage.css';
import TopInvestors from "../TopInvestors";

const HomePage = () => {
  const sessionUser = useSelector((state => state.session.user));
  const userAccount = useSelector(state => state.session.account)
  const accountPortfolio = useSelector(state => state.session.accountPortfolio)

  if (!sessionUser) return <Redirect to='/' />

  const todayChange = () => {
    let difference = (userAccount.current_balance - userAccount.previous_balance).toFixed(2);
    if (difference === 0) difference = '–';
    if (difference > 0) difference = `+${difference}`
    if (difference < 0) difference = `-${difference}`
    return difference
  }

  return (
    <>
      <div className='below-nav-container'>

        {!userAccount &&
          <CreateAccountModal />
        }
        {userAccount &&
          <>
            <div className='home-page-header'>
              <h1>{userAccount.name}</h1>
              <div className='header-info'>
                <dl>
                  <dt>Total Assets</dt>
                  <dd>{parseInt(userAccount.current_balance)
                    .toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</dd>
                </dl>
                <dl>
                  <dt>Today's Change</dt>
                  <dd>{todayChange()}</dd>
                </dl>
                <dl>
                  <dt>Previous Balance</dt>
                  <dd>{parseInt(userAccount.previous_balance)
                    .toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</dd>
                </dl>
                <dl>
                  <dt>Available Cash</dt>
                  <dd>{parseInt(userAccount.available_cash)
                    .toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</dd>
                </dl>
              </div>
            </div>
            {accountPortfolio &&
            <PortfolioView />
            }
            <TopInvestors />
          </>
        }
      </div>
      <Footer />
    </>

  )
}

export default HomePage;