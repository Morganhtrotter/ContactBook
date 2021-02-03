import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function Home(props) {
	console.log(props.dishes);

	return(
		<div className="container">
			<div>
				{props.dishes.map((dish) => {
					return(
						<div>
							<p>{dish.name}</p>
							<p>{dish.phone}</p>
							<p>{dish.address}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Home;