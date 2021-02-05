import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addContact = (contact) => ({
	type: ActionTypes.ADD_CONTACT,
	payload: contact
});


export const deleteContact = (id) => (dispatch) => {
	return fetch(baseUrl + 'contacts/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	});/*.then(response => {
			if (response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.catch(error => { console.log('Delete contacts ', error.message);
			alert('Your contact could not be deleted\nError: ' + error.message);});*/
};

export const putContact = (id, name, phone, address) => (dispatch) => {
	const updateContact = {
		id: id,
		name: name,
		phone: phone,
		address: address
	}

	return fetch(baseUrl + 'contacts/' + id, {
		method: 'PUT',
		body: JSON.stringify(updateContact),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	})
		.then(response => {
			if (response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		//.then(response => dispatch(addContact(response)))
		.catch(error => { console.log('Put contact ', error.message);
			alert('Your contact could not be edited\nError: ' + error.message);});
};

export const postContact = (id, name, phone, address) => (dispatch) => {
	const newContact = {
		id: id,
		name: name,
		phone: phone,
		address: address
	}

	return fetch(baseUrl + 'contacts', {
		method: 'POST',
		body: JSON.stringify(newContact),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	})
		.then(response => {
			if (response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(response => dispatch(addContact(response)))
		.catch(error => { console.log('Post contacts ', error.message);
			alert('Your contact could not be posted\nError: ' + error.message);});
};

export const fetchContacts = () => (dispatch) => {
	return fetch(baseUrl + 'contacts')
		.then(response => {
			if (response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(contacts => dispatch(addContacts(contacts)))
		.catch(error => dispatch(contactsFailed(error.message)));
}

export const contactsFailed = (errmess) => ({
	type: ActionTypes.CONTACTS_FAILED,
	payload: errmess
});

export const addContacts = (contacts) => ({
	type: ActionTypes.ADD_CONTACTS,
	payload: contacts
});