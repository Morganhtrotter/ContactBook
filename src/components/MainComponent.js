import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	}	
}

const mapDispatchToProps = (dispatch) => ({
	postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
	fetchComments: () => {dispatch(fetchComments())},
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchComments();
	}

	render() {

		const HomePage = () => {
			return(
				<Home dishes={this.props.comments.comments} />
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
