import React from "react";
import { Link } from "react-router-dom";
import { Character } from "../../store/rootSlice";

const CharacterCard: React.FC<{ details: Character }> = ({ details }) => {
	const { name, url } = details;

	const id = url.split("/");

	return (
		<Link to={`/people/${id[id.length - 2]}`}>
			<h1 key={name} className="cursor-pointer font-sans m-2 hover:underline">
				{name}
			</h1>
		</Link>
	);
};

export default CharacterCard;
