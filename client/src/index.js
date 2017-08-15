import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk                       from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import reducers   from './reducers';
import App        from './components/App';

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#root')
);
