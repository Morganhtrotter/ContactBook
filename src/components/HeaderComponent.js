import React, { Component } from 'react';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl.js';

class Header extends Component {

	render() {
		return(
			<div>
		      <Jumbotron>
		      	<div className="container">
		      		<div className="row row-header">
		      			<div className="col-12 col-sm-6" id="headerDiv">
		      				<img src={baseUrl + '/assets/images/Icon.png'} className="img-fluid" alt="ImageNotFound" />
		      				<h1 id="headerText">Contact Book</h1>
		      			</div>
		      		</div>
		      	</div>
		      </Jumbotron>
			</div>
		);
	}
}

export default Header;