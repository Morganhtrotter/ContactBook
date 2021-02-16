import React, { Component } from 'react';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl.js';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		var idPosted = 0;
		var posted = false;
		var idArray = [];
		for (var i = 0; i < this.props.contacts.length; i++) {
			idArray.push(this.props.contacts[i].id);
		}
		idArray.sort(function(a, b){return a-b});
		// Find the first instance of an absent id in database
		console.log(idArray);
		for (var i = 0; i < this.props.contacts.length; i++) {
			if (i + 1 != idArray[i]) {
				idPosted = i + 1;
				posted = true;
				break;
			}
		}
		// If didnt find any absent id's, add unique id
		if (posted == false) {
			idPosted = this.props.contacts.length + 1;
		}
		this.props.postContact(idPosted, values.yourname, values.phone, values.address);
	}

	render() {
		return(
			<div>
		      <Jumbotron>
		      	<div className="container">
		      		<div className="row row-header">
		      			<div className="col" id="headerDiv">
		      				<img src={baseUrl + '/assets/images/Icon.png'} className="img-fluid" alt="ImageNotFound" />
		      				<h1 id="headerText">Contact Book</h1>
		      				<Button color="primary" id="addButton" onClick={this.toggleModal}>Add Contact</Button>
							{/* Form to add a contact to db */}
							<Modal id="addModal" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
								<ModalHeader toggle={this.toggleModal}>Add Contact</ModalHeader>
								<ModalBody>
									<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
										<Row className="form-group">
											<Label htmlFor="yourname" md={10}>Contact Name</Label>
										</Row>
										<Row className="form-group">
											<Col>
												<Control.text model=".yourname" id="yourname" name="yourname"
														placeholder="John Doe"
														className="form-control"
														validators={{required}} />
												<Errors className="text-danger"
														model=".yourname"
														show="touched"
														id="errorText"
														messages={{
															required: 'Required'
														}}/>
											</Col>
										</Row>
										<Row className="form-group">
											<Label htmlFor="phone" md={10}>Phone</Label>
										</Row>
										<Row className="form-group">
											<Col>
												<Control.text model=".phone" id="phone" name="phone"
														placeholder="888-888-8888"
														className="form-control"/>
											</Col>
										</Row>
										<Row className="form-group">
											<Label htmlFor="address" md={10}>Address</Label>
										</Row>
										<Row className="form-group">
											<Col>
												<Control.text model=".address" id="address" name="address"
														placeholder="1 Main St."
														className="form-control" />
											</Col>
										</Row>
										<Row>
											<Col>
												<Button className="submitButton" type="submit" color="primary">
													Submit
												</Button>
											</Col>
										</Row>
									</LocalForm>
								</ModalBody>
							</Modal>
		      			</div>
		      		</div>
		      	</div>
		      </Jumbotron>
			</div>
		);
	}
}

export default Header;