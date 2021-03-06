import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			isEditModalOpen: false,
			editID: 0,
			deleted: false
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.toggleEditModal = this.toggleEditModal.bind(this);
		this.handlePut = this.handlePut.bind(this);
	}

	toggleEditModal(id) {
		this.setState({
			isEditModalOpen: !this.state.isEditModalOpen,
			editID: id // Set state to id of the contact the user is editing
		});
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
		this.props.putContact(this.state.editID, values.yourname, values.phone, values.address);
		window.location.reload(true);
	}
	
	render() {
		var numberInList = 0;
		var contactArray = [];
		// Bubble Sort
		const swap = (array, i, j) => {
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		};
		const bubbleSort = (array) => {
			for (var i = 0; i < array.length; i++) {
				for (var j = 1; j < array.length; j++) {
					if (array[j - 1].name > array[j].name) {
						swap(array, j - 1, j);
					}
				}
			}
			return array;
		};
		// Sort array of contacts in alphabetical order
		this.props.contacts.map((contact) => {
			contactArray.push(contact);
		});
		bubbleSort(contactArray);
		return(
			<div className="container" id="homeBackground">
				{contactArray.map((contact) => {
					numberInList++; // Count number of contacts
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
					{/* Form to edit a contact already in db */}
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