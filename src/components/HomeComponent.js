import React from 'react';

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