import React, { Component } from 'react';

class Home extends Component {
	constructor(props) {
		super(props);
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
				</div>
			</div>
		);
	};
}

export default Home;