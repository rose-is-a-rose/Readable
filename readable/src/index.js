import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { fetchCategories, fetchPosts } from './utils/api';

import registerServiceWorker from './registerServiceWorker';

function logger({ getState }) {
  return next => action => {
  	console.log('current store: ', getState())
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}


Promise.all([fetchPosts(), fetchCategories()])
  .then(([posts, {categories}]) => (
  	ReactDOM.render(
			<BrowserRouter>
				<Provider store={createStore(reducer, {posts, categories}, applyMiddleware(logger))}>
				  <App />
				</Provider>
			</BrowserRouter>,
			document.getElementById('root')
		)
));

  registerServiceWorker();


