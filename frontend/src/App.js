import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';

function App(store) {
  console.log(store);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <h1>Hello there friend!</h1>} />
        <Route path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
