import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import reducer from './reducers';
import { fetchCategories, fetchPosts } from './utils/api';
import registerServiceWorker from './registerServiceWorker';

Promise.all([fetchPosts(), fetchCategories()])
  .then(([posts, {categories}]) => (
  	ReactDOM.render(
			<BrowserRouter>
				<Provider
					store={createStore(
									reducer,
									{posts, categories},
									compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
								)}
				>
				  <App />
				</Provider>
			</BrowserRouter>,
			document.getElementById('root')
		)
));

registerServiceWorker();


