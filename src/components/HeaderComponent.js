import React, { Component } from 'react';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';

class Header extends Component {

	render() {
		return(
			<div>
		      <Jumbotron>
		      	<div className="container">
		      		<div className="row row-header">
		      			<div className="col-12 col-sm-6">
		      				<h1>Contact Book</h1>
		      			</div>
		      		</div>
		      	</div>
		      </Jumbotron>
			</div>
		);
	}
}

export default Header;