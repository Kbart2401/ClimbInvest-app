import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';
import SignupFormPage from './components/SignupFormPage/index';
import Navigation from './components/Navigation/index';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StockInfoPage from './components/StockInfoPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <BrowserRouter>
        <div className='page-container'>
          <Navigation />
          <Switch>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
            <Route path='/home'>
              <HomePage />
            </Route>
            <Route path='/stock-info'>
              <StockInfoPage />
            </Route>
            <Route path='/' component={LoginFormPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
