import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Details {
	url: string;
	title: string;
	director: string;
	producer: string;
	characters: string[];
}

const SpeciesMoviesCard: React.FC<{ details: Details }> = ({ details }) => {
	const { url, title } = details;

	const id = url.split("/");

	return (
		<Link to={`/films/${id[id.length - 2]}`}>
			<div className="flex flex-col">
				<div className="font-bold text-xl mb-2 flex flex-col">{title}</div>
			</div>
		</Link>
	);
};

export default SpeciesMoviesCard;
