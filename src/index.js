import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
