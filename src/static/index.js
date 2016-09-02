import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


const target = document.getElementById('root');

const store = configureStore(window.INITIAL_STATE, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const node = (
    <Root store={store} history={history}/>
);

ReactDOM.render(node, target);
