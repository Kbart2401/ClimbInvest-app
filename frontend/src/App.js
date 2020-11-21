import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';
import SignupFormPage from './components/SignupFormPage/index';
import Navigation from './components/Navigation/index';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';

function App() {
  const state = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
