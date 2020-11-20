import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';

function App() {
  return (
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
