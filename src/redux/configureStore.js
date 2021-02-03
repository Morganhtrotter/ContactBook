import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Comments } from './comments.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			comments: Comments
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}