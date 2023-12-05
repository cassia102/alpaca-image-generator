import React from "react";

const Style = ({ attributes, changeImage }) => {
	return (
		<div className="btn-controls">
			<h2 className="heading">{attributes.label}</h2>
			{attributes.items.map((attr) => (
				<button
					className='style-btn'
					key={attr.id}
					onClick={() => changeImage(attributes, attr)}
				>
					{attr.label}
				</button>
			))}
		</div>
	);
};

export default Style;