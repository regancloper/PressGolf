import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './App';
import './scss/app';
import reducers from './reducers';
// import { AuthProvider } from './components/providers/AuthProvider';

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

render(
	// <AuthProvider>
	<Provider store={store}>
		<App />
	</Provider>,
	// </AuthProvider>,
	document.getElementById('root')
);
