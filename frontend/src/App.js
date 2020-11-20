import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPageForm from './components/LoginFormPage/index';

function App() {
  return (
    <>
      <Switch>
        <Route path='/login'>
          <LoginPageForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
