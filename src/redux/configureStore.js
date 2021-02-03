import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Contacts } from './contacts.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			contacts: Contacts
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}