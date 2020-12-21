import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import { restoreCSRF, fetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as stockSearchActions from './store/stockSearch';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()
  window.csrfFetch = fetch;
  window.store = store
  window.sessionActions = sessionActions
  window.stockSearchActions = stockSearchActions
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
