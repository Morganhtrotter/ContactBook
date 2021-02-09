import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { LocalForm, Control } from 'react-redux-form';


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			isEditModalOpen: false,
			editID: 0,
			deleted: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.toggleEditModal = this.toggleEditModal.bind(this);
		this.handlePut = this.handlePut.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	toggleEditModal(id) {
		console.log("intoggleEdit: " + id);
		this.setState({
			isEditModalOpen: !this.state.isEditModalOpen,
			editID: id
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
		for (var i = 0; i < this.props.contacts.length; i++) {
			if (i + 1 != idArray[i]) {
				idPosted = i + 1;
				posted = true;
			}
		}
		if (posted == false) {
			idPosted = this.props.contacts.length + 1;
		}
		this.props.postContact(idPosted, values.yourname, values.phone, values.address);
	}

	
	handleDelete(id) {
		this.props.deleteContact(id);
		console.log("here");
		/*this.setState({
			deleted: !this.state.deleted
		});*/
		window.location.reload(true);
		//this.forceUpdate();
	}

	handlePut(values) {
		this.toggleEditModal();
		console.log("in handle put" + this.state.editID);
		this.props.putContact(this.state.editID, values.yourname, values.phone, values.address);
	}
	
	render() {
		var numberInList = 0;
		return(
			<div className="container" id="homeBackground">
				{this.props.contacts.map((contact) => {
					numberInList++;
					return(
						<div className="contactDiv" key={contact.id}>
							<p className="numberInList">{numberInList.toLocaleString('en-US', {
								minimumIntegerDigits: 2,
								useGrouping: false
							})}</p>
							<p className="contactText"><span className="generalText">Name:</span><span className="contactName"> {contact.name}</span></p>
							<p className="contactText"><span className="generalText">Phone:</span> {contact.phone}</p>
							<p className="contactText"><span className="generalText">Address:</span> {contact.address}</p>
							<Button outline color="primary" className="editButton" onClick={() => this.toggleEditModal(contact.id)}>Edit</Button>
							<Button outline color="danger" className="deleteButton" onClick={() => this.handleDelete(contact.id)}>Delete</Button>
						</div>
					);
				})}
				{numberInList === 0 && <p id="noContacts">No contacts yet. Press "Add Contact" to get started.</p>}
				<div>
					<Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal}>
						<ModalHeader toggle={this.toggleEditModal}>Edit Contact</ModalHeader>
						<ModalBody>
							<LocalForm onSubmit={(values) => this.handlePut(values)}>
								<Row className="form-group">
									<Label htmlFor="yourname" md={10}>Contact Name</Label>
								</Row>
								<Row className="form-group">
									<Col>
										<Control.text model=".yourname" id="yourname" name="yourname"
												placeholder="John Doe"
												className="form-control" />
									</Col>
								</Row>
								<Row className="form-group">
									<Label htmlFor="phone" md={10}>Phone</Label>
								</Row>
								<Row className="form-group">
									<Col>
										<Control.text model=".phone" id="phone" name="phone"
												placeholder="888-888-8888"
												className="form-control" />
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
					<Button color="primary" id="addButton" onClick={this.toggleModal}>Add Contact</Button>
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
												className="form-control" />
									</Col>
								</Row>
								<Row className="form-group">
									<Label htmlFor="phone" md={10}>Phone</Label>
								</Row>
								<Row className="form-group">
									<Col>
										<Control.text model=".phone" id="phone" name="phone"
												placeholder="888-888-8888"
												className="form-control" />
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
		);
	};
}

export default Home;