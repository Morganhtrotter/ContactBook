import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { LocalForm, Control } from 'react-redux-form';


class Home extends Component {
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
		this.props.postContact(this.props.contacts.length, values.yourname, values.phone, values.address);
	}
	
	render() {
		return(
			<div className="container">
				<div>
					{this.props.contacts.map((contact) => {
						return(
							<div>
								<p>{contact.name}</p>
								<p>{contact.phone}</p>
								<p>{contact.address}</p>
							</div>
						);
					})}
					<div>
						<Button onClick={this.toggleModal}>Add Contact</Button>
						<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
							<ModalHeader toggle={this.toggleModal}>Add Contact</ModalHeader>
							<ModalBody>
								<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
									<Row className="form-group">
										<Label htmlfor="yourname" md={10}>Contact Name</Label>
									</Row>
									<Row className="form-group">
										<Col>
											<Control.text model=".yourname" id="yourname" name="yourname"
													placeholder="John Doe"
													className="form-control" />
										</Col>
									</Row>
									<Row className="form-group">
										<Label htmlfor="phone" md={10}>Phone</Label>
									</Row>
									<Row className="form-group">
										<Col>
											<Control.text model=".phone" id="phone" name="phone"
													placeholder="888-888-8888"
													className="form-control" />
										</Col>
									</Row>
									<Row className="form-group">
										<Label htmlfor="address" md={10}>Address</Label>
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
											<Button type="submit" color="primary">
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
		);
	};
}

export default Home;