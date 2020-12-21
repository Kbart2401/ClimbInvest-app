import React, { useEffect, useState, createContext } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';
import SignupFormPage from './components/SignupFormPage/index';
import Navigation from './components/Navigation/index';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import HomePage from './components/HomePage';
import StockInfoPage from './components/StockInfoPage';
import TradePage from './components/TradePage';

export const AppWithContext = createContext()

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalAccountValue, setTotalAccountValue] = useState(0);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <AppWithContext.Provider value={totalAccountValue}>
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
            <Route path='/trade' component={TradePage} />
            <Route path='/' component={LoginFormPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </AppWithContext.Provider>
  );
}

export default App;
