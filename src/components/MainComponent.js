import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postContact, fetchContacts, deleteContact, putContact } from '../redux/ActionCreators';

const mapStateToProps = state => {
	return {
		contacts: state.contacts
	}	
}

const mapDispatchToProps = (dispatch) => ({
	postContact: (id, name, phone, address) => dispatch(postContact(id, name, phone, address)),
	putContact: (id, name, phone, address) => dispatch(putContact(id, name, phone, address)),
	fetchContacts: () => {dispatch(fetchContacts())},
	deleteContact: (id) => (dispatch(deleteContact(id)))
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchContacts();
	}

	render() {

		const HomePage = () => {
			return(
				<Home contacts={this.props.contacts.contacts} postContact={this.props.postContact}
						deleteContact={this.props.deleteContact}
						putContact={this.props.putContact}/>
			);
		}

		return (
		    <div id="mainBackground">
		    	<Header />
			    	<Switch>
			    		<Route path="/home" component={HomePage} />
			    		<Redirect to="/home" />
			    	</Switch>
		    </div>
	  	);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
