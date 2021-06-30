import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';
import SignupFormPage from './components/SignupFormPage/index';
import Navigation from './components/Navigation/index';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import HomePage from './components/HomePage';
import StockHomePage from './components/StockHomePage';
import TradeHeader from './components/TradeHeader';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  return isLoaded && (
    <BrowserRouter>
      <div className='page-container'>
        <Navigation />
        <Switch>
          <Route path='/signup' component={SignupFormPage} />
          <Route path='/home' component={HomePage} />
          <Route path='/stock-info' component={StockHomePage} />
          <Route path='/trade' component={TradeHeader} />
          <Route path='/' component={LoginFormPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
