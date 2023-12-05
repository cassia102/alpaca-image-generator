import React from "react";

const Accessorize = ({ attributes, setFeatureItem }) => {

	return (
		<button
			className={`acc-btn ${attributes.selected ? "selected" : ""}`}
			key={attributes.id}
			onClick={() => setFeatureItem(attributes)}
		>
			{attributes.label}
		</button>
	);
};

export default Accessorize;