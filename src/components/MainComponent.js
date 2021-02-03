import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postContact, fetchContacts } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
	return {
		contacts: state.contacts
	}	
}

const mapDispatchToProps = (dispatch) => ({
	postContact: (dishId, rating, author, contact) => dispatch(postContact(dishId, rating, author, contact)),
	fetchContacts: () => {dispatch(fetchContacts())},
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
				<Home contacts={this.props.contacts.contacts} />
			);
		}

		return (
	    <div>
	    	<Header />
	    		<TransitionGroup>
	    			<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
				    	<Switch>
				    		<Route path="/home" component={HomePage} />
				    		<Redirect to="/home" />
				    	</Switch>
				    </CSSTransition>
		    	</TransitionGroup>
	      <Footer />
	    </div>
  	);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
